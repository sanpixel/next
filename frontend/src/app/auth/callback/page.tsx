"use client";
import { useEffect } from 'react';
import { initializeSupabase } from '../../../supabaseClient';

export default function AuthCallback() {
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { supabase } = await initializeSupabase();
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth error:', error);
          window.location.href = '/';
          return;
        }

        if (data.session) {
          console.log('User authenticated:', data.session.user);
          window.location.href = '/'; // redirect back to home
        } else {
          window.location.href = '/';
        }
      } catch (error) {
        console.error('AuthCallback error:', error);
        window.location.href = '/';
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Completing authentication...</h1>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
}
