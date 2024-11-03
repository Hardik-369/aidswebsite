import React, { useState, useEffect } from 'react';
import { supabase, adminSupabase, uploadQuestionPaper, ensureQuestionPapersBucket } from '../lib/supabase';
import { Plus, Send, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import LoginFormComponent from '../components/LoginForm';
import Modal from '../components/Modal';
import PaperUploadForm from '../components/PaperUploadForm';
import NoticeForm from '../components/NoticeForm';
import type { LoginFormData, PaperForm, NoticeForm as NoticeFormType } from '../types';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginFormData>({ username: '', password: '' });
  const [showPaperModal, setShowPaperModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [paperForm, setPaperForm] = useState<PaperForm>({
    title: '',
    subject: '',
    year: new Date().getFullYear().toString(),
    file: null,
  });
  const [noticeForm, setNoticeForm] = useState<NoticeFormType>({ title: '', content: '' });

  useEffect(() => {
    ensureQuestionPapersBucket().catch(console.error);
  }, []);

  const handleLoginChange = (field: keyof LoginFormData, value: string) => {
    setLoginForm(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'yashoda' && loginForm.password === 'yashoda@321') {
      setIsAuthenticated(true);
      toast.success('Successfully logged in!');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const handlePaperChange = (field: keyof PaperForm, value: string | File | null) => {
    setPaperForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePaperSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperForm.file) {
      toast.error('Please select a file');
      return;
    }

    setIsUploading(true);
    try {
      await uploadQuestionPaper(paperForm.file, {
        title: paperForm.title,
        subject: paperForm.subject,
        year: paperForm.year,
      });

      toast.success('Question paper uploaded successfully!');
      setShowPaperModal(false);
      setPaperForm({
        title: '',
        subject: '',
        year: new Date().getFullYear().toString(),
        file: null,
      });
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast.error(error.message || 'Failed to upload question paper');
    } finally {
      setIsUploading(false);
    }
  };

  const handleNoticeChange = (field: keyof NoticeFormType, value: string) => {
    setNoticeForm(prev => ({ ...prev, [field]: value }));
  };

  const handleNoticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await adminSupabase
        .from('notices')
        .insert([noticeForm]);

      if (error) throw error;

      setNoticeForm({ title: '', content: '' });
      setShowNoticeModal(false);
      toast.success('Notice posted successfully!');
    } catch (error: any) {
      console.error('Error posting notice:', error);
      toast.error(error.message || 'Failed to post notice');
    }
  };

  if (!isAuthenticated) {
    return (
      <LoginFormComponent
        loginForm={loginForm}
        onSubmit={handleLogin}
        onChange={handleLoginChange}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button
                onClick={() => setShowPaperModal(true)}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Question Paper
              </button>
              <button
                onClick={() => setShowNoticeModal(true)}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <Send className="h-5 w-5 mr-2" />
                Post Notice
              </button>
            </div>
          </div>
        </div>

        {showPaperModal && (
          <Modal title="Add Question Paper" onClose={() => setShowPaperModal(false)}>
            <PaperUploadForm
              paperForm={paperForm}
              isUploading={isUploading}
              onSubmit={handlePaperSubmit}
              onChange={handlePaperChange}
            />
          </Modal>
        )}

        {showNoticeModal && (
          <Modal title="Post Notice" onClose={() => setShowNoticeModal(false)}>
            <NoticeForm
              noticeForm={noticeForm}
              onSubmit={handleNoticeSubmit}
              onChange={handleNoticeChange}
            />
          </Modal>
        )}

        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Remember to configure Supabase Storage policies and RLS policies for secure file management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}