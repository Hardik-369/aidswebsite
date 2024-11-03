import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import NoticeCard from '../components/NoticeCard';
import { Building2, Mail, Phone, BookOpen, Users, Trophy, GraduationCap } from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface Faculty {
  name: string;
  position: string;
  specialization: string;
}

const faculties: Faculty[] = [
  {
    name: "Dr. Suraj Nalawade",
    position: "Department Head",
    specialization: "Automata theory, Computing"
  },
  {
    name: "Dr. Pravin Barapatre",
    position: " Associate Professor",
    specialization: "Internet of Things, Smart Irrigation, Precision Agriculture"
  },
  {
    name: "Himgouri Tapase",
    position: "Assitant Professor",
    specialization: "Python Programming, Computer Security"
  },
  {
    name: "Dr. Santosh Itraj",
    position: "Professor",
    specialization: "Signal Processing,Embedded systems"
  },
  {
    name: "Amruta Sanas",
    position: "Assistant Professor",
    specialization: "Statistics"
  }
];

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    async function fetchNotices() {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error && data) {
        setNotices(data);
      }
    }

    fetchNotices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="relative bg-indigo-700 dark:bg-indigo-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-20"
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
            alt="University campus"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 text-center sm:text-left">
            Shaping Tomorrow's Leaders
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100 max-w-2xl text-center sm:text-left">
            Join our prestigious department where innovation meets excellence. We're committed to providing world-class education and fostering groundbreaking research.
          </p>
        </div>
      </div>

      {/* Goals Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8 sm:mb-12">Our Goals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-indigo-600 dark:text-indigo-400 mb-4">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Academic Excellence</h3>
            <p className="text-gray-600 dark:text-gray-300">Providing top-tier education and fostering critical thinking.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-indigo-600 dark:text-indigo-400 mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Community Building</h3>
            <p className="text-gray-600 dark:text-gray-300">Creating a supportive and inclusive learning environment.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-indigo-600 dark:text-indigo-400 mb-4">
              <Trophy className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Research Innovation</h3>
            <p className="text-gray-600 dark:text-gray-300">Advancing knowledge through cutting-edge research.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-indigo-600 dark:text-indigo-400 mb-4">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Career Development</h3>
            <p className="text-gray-600 dark:text-gray-300">Preparing students for successful professional careers.</p>
          </div>
        </div>
      </div>

      {/* Faculty Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Our Faculty
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faculties.map((faculty, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="p-6 flex flex-col items-center">
                {/* Faculty Information */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {faculty.name}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                    {faculty.position}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {faculty.specialization}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

      {/* Notices Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest Notices</h2>
            <div className="space-y-4">
              {notices.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  title={notice.title}
                  content={notice.content}
                  date={notice.created_at}
                />
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Building2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2 flex-shrink-0" />
                <span>Yashoda Technical Campus Wadhe Satara</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2 flex-shrink-0" />
                <span className="break-all">aidshod_ytc@yes.edu.in</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Phone className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2 flex-shrink-0" />
                <span>+91 9881445045</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
