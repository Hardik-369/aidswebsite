import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://xdlfzagbeklvmalprkpp.supabase.co';
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkbGZ6YWdiZWtsdm1hbHBya3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyMDU5MTEsImV4cCI6MjA0NTc4MTkxMX0.7aC1iUJqgyRE-OVxFtnpsEtCNUdakX3F5Vaak0HGDmc';
const SUPABASE_SERVICE_KEY =
  import.meta.env.VITE_SUPABASE_SERVICE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkbGZ6YWdiZWtsdm1hbHBya3BwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDIwNTkxMSwiZXhwIjoyMDQ1NzgxOTExfQ.7KyJ8tfvzc2EouPKaFtPwd-_-mfQi7ZrgWd6c1DoDc8';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const adminSupabase = createClient(supabaseUrl, SUPABASE_SERVICE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

const BUCKET_NAME = 'question-papers';

export async function ensureQuestionPapersBucket() {
  try {
    const { data: buckets, error: bucketsError } =
      await adminSupabase.storage.listBuckets();

    if (bucketsError) {
      throw new Error(`Failed to list buckets: ${bucketsError.message}`);
    }

    const bucketExists = buckets?.some((bucket) => bucket.name === BUCKET_NAME);

    if (!bucketExists) {
      const { error: createError } = await adminSupabase.storage.createBucket(
        BUCKET_NAME,
        {
          public: false,
          fileSizeLimit: 10485760,
        }
      );

      if (createError) {
        throw new Error(`Failed to create bucket: ${createError.message}`);
      }
    }

    const { error: updateError } = await adminSupabase.storage.updateBucket(
      BUCKET_NAME,
      {
        public: false,
        allowedMimeTypes: ['application/pdf'],
        fileSizeLimit: 10485760,
      }
    );

    if (updateError) {
      throw new Error(`Failed to update bucket: ${updateError.message}`);
    }
  } catch (error) {
    console.error('Error configuring bucket:', error);
    throw error;
  }
}

export async function uploadQuestionPaper(
  file: File,
  metadata: { title: string; subject: string; year: string }
) {
  try {
    await ensureQuestionPapersBucket();

    if (!file.type.includes('pdf')) {
      throw new Error('Only PDF files are allowed');
    }

    const fileExt = 'pdf';
    const sanitizedTitle = metadata.title
      .replace(/[^a-zA-Z0-9]/g, '-')
      .toLowerCase();
    const fileName = `${
      metadata.year
    }/${sanitizedTitle}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await adminSupabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        contentType: 'application/pdf',
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Generate a long-lived signed URL (315576000 seconds = 10 years)
    const { data: signedUrlData, error: signedUrlError } =
      await adminSupabase.storage
        .from(BUCKET_NAME)
        .createSignedUrl(fileName, 315576000);

    if (signedUrlError) {
      throw new Error(
        `Failed to generate signed URL: ${signedUrlError.message}`
      );
    }

    if (!signedUrlData?.signedUrl) {
      throw new Error('Failed to generate signed URL: No URL returned');
    }

    // Store the complete signed URL in the database
    const { error: dbError } = await adminSupabase
      .from('question_papers')
      .insert([
        {
          title: metadata.title,
          subject: metadata.subject,
          year: metadata.year,
          file_url: signedUrlData.signedUrl,
        },
      ]);

    if (dbError) {
      throw new Error(`Database insert failed: ${dbError.message}`);
    }

    return signedUrlData.signedUrl;
  } catch (error) {
    console.error('Error in uploadQuestionPaper:', error);
    throw error;
  }
}
