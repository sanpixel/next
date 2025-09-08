import { useState, useEffect } from 'react';
import { getSupabase, initializeSupabase } from '../supabaseClient';

export default function Auth() {
  const [session, setSession] = useState(null);
  const [supabase, setSupabase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const setupAuth = async () => {
      try {
        const { supabase: client, config: cfg } = await initializeSupabase();
        setSupabase(client);
        setConfig(cfg);
        
        // Get initial session
        const { data: { session } } = await client.auth.getSession();
        setSession(session);
        
        // Listen for auth changes
        const {
          data: { subscription },
        } = client.auth.onAuthStateChange((_event, session) => {
          setSession(session);
        });
        
        setLoading(false);
        
        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Auth setup error:', error);
        setLoading(false);
      }
    };
    
    setupAuth();
  }, []);

  const signInWithGoogle = async () => {
    if (!supabase) return;
    const siteUrl = config?.deployUrl || config?.siteUrl || window.location.origin;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${siteUrl}/auth/callback`
      }
    });
    if (error) console.error('Error:', error);
  };

  const signOut = async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error:', error);
  };

  if (loading) {
    return (
      <>
        <p>Loading Supabase configuration...</p>
      </>
    );
  }

  if (session) {
    return (
      <>
        <p>Welcome, {session.user.email}!</p>
        <button onClick={signOut}>Sign Out</button>
      </>
    );
  }

  return (
    <>
      <p>
        Welcome to <code>next</code> - Supabase OAuth Demo
      </p>
      <button onClick={signInWithGoogle} disabled={!supabase}>
        Sign in with Google
      </button>
      {!config && <p style={{color: 'red', fontSize: '12px'}}>Config not loaded</p>}
      <p>
        <a
          className="App-link"
          href="https://supabase.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Supabase
        </a>
      </p>
    </>
  );
}
