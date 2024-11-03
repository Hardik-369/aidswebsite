import React from 'react';
import { Clock } from 'lucide-react';

interface NoticeCardProps {
  title: string;
  content: string;
  date: string;
}

export default function NoticeCard({ title, content, date }: NoticeCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{content}</p>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Clock className="h-4 w-4 mr-1" />
        <span>{new Date(date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}