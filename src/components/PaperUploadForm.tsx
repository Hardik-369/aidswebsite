import React from 'react';
import { Upload } from 'lucide-react';
import type { PaperForm } from '../types';

interface PaperUploadFormProps {
  paperForm: PaperForm;
  isUploading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (field: keyof PaperForm, value: string | File | null) => void;
}

export default function PaperUploadForm({ paperForm, isUploading, onSubmit, onChange }: PaperUploadFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={paperForm.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Subject</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={paperForm.subject}
          onChange={(e) => onChange('subject', e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Year</label>
        <input
          type="number"
          required
          min="1900"
          max="2099"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={paperForm.year}
          onChange={(e) => onChange('year', e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload PDF</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf"
                  required
                  onChange={(e) => onChange('file', e.target.files?.[0] || null)}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PDF up to 10MB</p>
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={isUploading}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
      >
        {isUploading ? 'Uploading...' : 'Upload Paper'}
      </button>
    </form>
  );
}