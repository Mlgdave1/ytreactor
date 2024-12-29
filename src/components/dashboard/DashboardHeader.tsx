import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Database } from '../../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const DashboardHeader: React.FC = () => {
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
    enabled: !!user?.id
  });

  return (
    <div className="bg-[#1a1a1a] border-b border-[#272727] mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome, {profile?.username || user?.email}
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              {profile?.subscription_tier === 'free' ? (
                <>
                  Free Plan · {profile?.monthly_video_count}/3 videos this month
                </>
              ) : (
                <>
                  {profile?.subscription_tier.charAt(0).toUpperCase() + 
                   profile?.subscription_tier.slice(1)} Plan · Unlimited videos
                </>
              )}
            </p>
          </div>
          {profile?.subscription_tier === 'free' && (
            <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition-colors">
              Upgrade Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};