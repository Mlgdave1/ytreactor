import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { logger } from '../services/logger';

export const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        logger.info('AuthCallback', 'Processing authentication callback');
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          logger.error('AuthCallback', 'Session error', { error });
          throw error;
        }
        
        if (session) {
          logger.info('AuthCallback', 'Session found, redirecting to dashboard');
          navigate('/dashboard');
        } else {
          logger.warn('AuthCallback', 'No session found, redirecting to login');
          navigate('/login');
        }
      } catch (error) {
        logger.error('AuthCallback', 'Auth callback error', { error });
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );
};