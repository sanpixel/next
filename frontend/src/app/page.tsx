"use client";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from '../components/Auth';
import AuthCallback from '../components/AuthCallback';

export default function Home() {
  const DEBUG = true; // Set to false to hide debug info
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 py-6">
            {DEBUG && (
              <div className="text-xs text-left mb-4 border border-blue-500 p-4 bg-blue-50 dark:bg-blue-900">
                <h3 className="font-bold text-lg mb-2">Environment Debug</h3>
                <p>REACT_APP_SUPABASE_URL: {process.env.REACT_APP_SUPABASE_URL || 'NOT SET'}</p>
                <p>REACT_APP_SUPABASE_ANON_KEY: {process.env.REACT_APP_SUPABASE_ANON_KEY || 'NOT SET'}</p>
                <p>REACT_APP_SITE_URL: {process.env.REACT_APP_SITE_URL || 'NOT SET'}</p>
                <p>
                  <a href="/api/debug/env" target="_blank" className="text-blue-600 hover:underline">
                    Check .env file content
                  </a>
                </p>
                <p>
                  <a href="/api/config" target="_blank" className="text-blue-600 hover:underline">
                    Check runtime config
                  </a>
                </p>
              </div>
            )}
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
            </Routes>
            <div className="text-xs text-center mt-8">
              <a href="/files" target="_blank" className="text-blue-600 hover:underline">
                Browse container files
              </a>
            </div>
          </div>
        </header>
      </div>
    </Router>
  );
}
