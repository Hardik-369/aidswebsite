import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { FileText, Download, Search, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface QuestionPaper {
  id: number;
  title: string;
  subject: string;
  year: string;
  file_path: string;
  file_url: string;
  created_at: string;
}

function QuestionPapers() {
  const [papers, setPapers] = useState<QuestionPaper[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPapers();
  }, []);

  async function fetchPapers() {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('question_papers')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw new Error(`Failed to fetch papers: ${fetchError.message}`);
      }

      setPapers(data || []);
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to load question papers';
      console.error('Error fetching papers:', error);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDownload(paper: QuestionPaper) {
    if (!paper.file_url) {
      toast.error('Download URL not found');
      return;
    }

    try {
      setLoadingId(paper.id);
      
      const link = document.createElement('a');
      link.href = paper.file_url;
      link.setAttribute('download', `${paper.title}-${paper.year}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Download started');
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to download file';
      console.error('Download error:', error);
      toast.error(errorMessage);
    } finally {
      setLoadingId(null);
    }
  }

  const filteredPapers = papers.filter(paper =>
    paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.year.includes(searchTerm)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-2">Loading papers...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Question Papers</h1>
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search papers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
              <p className="ml-3 text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Desktop view */}
          <div className="hidden sm:block">
            <div className="min-w-full divide-y divide-gray-200">
              <div className="bg-gray-50">
                <div className="grid grid-cols-12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="col-span-5">Title</div>
                  <div className="col-span-3">Subject</div>
                  <div className="col-span-2">Year</div>
                  <div className="col-span-2">Action</div>
                </div>
              </div>
              <div className="bg-white divide-y divide-gray-200">
                {filteredPapers.map((paper) => (
                  <div key={paper.id} className="grid grid-cols-12 px-6 py-4 hover:bg-gray-50">
                    <div className="col-span-5 flex items-center">
                      <FileText className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                      <span className="text-gray-900">{paper.title}</span>
                    </div>
                    <div className="col-span-3 text-gray-500">{paper.subject}</div>
                    <div className="col-span-2 text-gray-500">{paper.year}</div>
                    <div className="col-span-2">
                      <button
                        onClick={() => handleDownload(paper)}
                        disabled={loadingId === paper.id}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        {loadingId === paper.id ? 'Loading...' : 'Download'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile view */}
          <div className="sm:hidden divide-y divide-gray-200">
            {filteredPapers.map((paper) => (
              <div key={paper.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                    <h3 className="font-medium text-gray-900">{paper.title}</h3>
                  </div>
                  <span className="text-sm text-gray-500">{paper.year}</span>
                </div>
                <div className="text-sm text-gray-500 mb-3">{paper.subject}</div>
                <button
                  onClick={() => handleDownload(paper)}
                  disabled={loadingId === paper.id}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {loadingId === paper.id ? 'Loading...' : 'Download Paper'}
                </button>
              </div>
            ))}
          </div>

          {filteredPapers.length === 0 && (
            <div className="px-6 py-4 text-center text-gray-500">
              No question papers found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionPapers;