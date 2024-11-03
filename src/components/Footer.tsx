import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="break-all">aidshod_ytc@yes.edu.in</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>+91 9881445045</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>Yashoda Technical Campus Wadhe Satara</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">About Us</a></li>
              <li><a href="https://engg.yes.edu.in/uploads/timetable/1716185625_856788315.pdf" target='_blank' className="hover:text-indigo-600 dark:hover:text-indigo-400">Academic Calendar</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h3>
            <div className="flex flex-wrap gap-4">
              <a href="https://x.com/YSPMYTC" target='_blank' className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/yashoda-institutes-8b1b00317/" target='_blank' className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/yashodainstitutes/" target='_blank' className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Department Portal. All rights reserved. Created By @hardikkawale
          </p>
        </div>
      </div>
    </footer>
  );
}