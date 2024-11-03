import React from 'react';
import type { NoticeForm as NoticeFormType } from '../types';

interface NoticeFormProps {
  noticeForm: NoticeFormType;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (field: keyof NoticeFormType, value: string) => void;
}

export default function NoticeForm({ noticeForm, onSubmit, onChange }: NoticeFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={noticeForm.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={noticeForm.content}
          onChange={(e) => onChange('content', e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Post Notice
      </button>
    </form>
  );
}