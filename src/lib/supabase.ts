import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { logger } from '../services/logger';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

// Get the current URL for the redirect
const getRedirectTo = () => {
  const origin = window.location.origin;
  const path = '/auth/callback';
  return `${origin}${path}`;
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: window.localStorage,
    storageKey: 'ytreactor-auth-token',
    debug: true,
    cookieOptions: {
      domain: window.location.hostname,
      sameSite: 'Lax',
      secure: window.location.protocol === 'https:'
    }
  },
  global: {
    headers: {
      'X-Client-Info': 'ytreactor-web'
    }
  }
});

// Debug helper to log auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  logger.info('Auth', 'Auth state changed', { 
    event, 
    email: session?.user?.email,
    userId: session?.user?.id 
  });
});

// Helper functions for auth
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    logger.info('Auth', 'Attempting email signup', { email });
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getRedirectTo(),
        data: {
          username: email.split('@')[0],
        }
      }
    });

    if (error) {
      logger.error('Auth', 'Sign up error', { error });
      throw error;
    }

    logger.info('Auth', 'Sign up successful', { userId: data.user?.id });
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    logger.info('Auth', 'Attempting email sign in', { email });
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      logger.error('Auth', 'Sign in error', { error });
      throw error;
    }

    logger.info('Auth', 'Sign in successful', { userId: data.user?.id });
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const signInWithGoogle = async () => {
  try {
    logger.info('Auth', 'Attempting Google sign in');
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getRedirectTo(),
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });

    if (error) {
      logger.error('Auth', 'Google sign in error', { error });
      throw error;
    }

    logger.info('Auth', 'Google sign in initiated');
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    logger.info('Auth', 'Attempting sign out');
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      logger.error('Auth', 'Sign out error', { error });
      throw error;
    }

    logger.info('Auth', 'Sign out successful');
    return { error: null };
  } catch (error: any) {
    return { error };
  }
};