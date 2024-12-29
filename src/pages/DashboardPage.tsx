import React, { useState } from 'react';
import { VideoList } from '../components/dashboard/VideoList';
import { TemplateBuilder } from '../components/templates/TemplateBuilder';
import { AssetLibrary } from '../components/dashboard/AssetLibrary';
import { RecordingHistory } from '../components/dashboard/RecordingHistory';
import { AffiliateStats } from '../components/dashboard/AffiliateStats';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout, Video, Image, Settings, History, DollarSign } from 'lucide-react';
import { cn } from '../utils/cn';

const queryClient = new QueryClient();

type DashboardSection = 'videos' | 'templates' | 'assets' | 'recordings' | 'settings' | 'affiliate';

const sections = [
  { id: 'videos', label: 'Videos', icon: Video },
  { id: 'templates', label: 'Templates', icon: Layout },
  { id: 'assets', label: 'Assets', icon: Image },
  { id: 'recordings', label: 'Recordings', icon: History },
  { id: 'affiliate', label: 'Affiliate', icon: DollarSign },
  { id: 'settings', label: 'Settings', icon: Settings }
] as const;

export const DashboardPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>('videos');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[#0f0f0f]">
        {/* Template Builder */}
        <div className="border-b border-[#272727]">
          <TemplateBuilder />
        </div>

        {/* Dashboard Content */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-[#1a1a1a] border-r border-[#272727] min-h-[calc(100vh-64px)]">
            <div className="p-4">
              <h2 className="text-xl font-bold text-white mb-1">Dashboard</h2>
              <p className="text-sm text-gray-400">Manage your content</p>
            </div>
            <nav className="mt-4">
              {sections.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id as DashboardSection)}
                  className={cn(
                    "w-full px-4 py-3 flex items-center gap-3 text-left transition-colors",
                    activeSection === id
                      ? "bg-red-500/10 text-red-500 border-l-2 border-red-500"
                      : "text-gray-400 hover:bg-[#272727] hover:text-white"
                  )}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            <div className="p-8">
              {activeSection === 'videos' && <VideoList />}
              {activeSection === 'templates' && <TemplateBuilder />}
              {activeSection === 'assets' && <AssetLibrary />}
              {activeSection === 'recordings' && <RecordingHistory />}
              {activeSection === 'affiliate' && <AffiliateStats />}
              {activeSection === 'settings' && (
                <div className="text-white">Settings (Coming Soon)</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};