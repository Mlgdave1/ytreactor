import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Video, Plus, Layout, Grid, List, Clock, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

// Dummy data for demonstration
const dummyVideos = [
  {
    id: '1',
    title: 'React to Michael Jackson',
    thumbnail: 'https://i3.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: 245,
    status: 'ready',
    created_at: '2024-02-28T12:00:00Z',
    views: 1234
  },
  {
    id: '2',
    title: 'My First Reaction Video',
    thumbnail: 'https://i3.ytimg.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
    duration: 180,
    status: 'processing',
    created_at: '2024-02-27T15:30:00Z',
    views: 567
  },
  {
    id: '3',
    title: 'Reacting to Viral Trends',
    thumbnail: 'https://i3.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg',
    duration: 320,
    status: 'ready',
    created_at: '2024-02-26T09:15:00Z',
    views: 890
  }
];

type ViewMode = 'grid' | 'list';

export const VideoList: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  
  // This will be replaced with actual data fetching later
  const { data: videos, isLoading } = useQuery({
    queryKey: ['videos'],
    queryFn: () => Promise.resolve(dummyVideos)
  });

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!videos?.length) {
    return (
      <div className="text-center py-12 bg-[#1a1a1a] rounded-lg border border-[#272727]">
        <Video className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-white">No videos yet</h3>
        <p className="mt-2 text-sm text-gray-400 max-w-sm mx-auto">
          Get started by creating your first reaction video or building a template
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors inline-flex items-center gap-2"
          >
            <Plus size={20} />
            New Recording
          </Link>
          <Link
            to="/dashboard?section=templates"
            className="px-4 py-2 bg-[#272727] text-white rounded-md hover:bg-[#323232] transition-colors inline-flex items-center gap-2"
          >
            <Layout size={20} />
            Create Template
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Your Videos</h2>
        <div className="flex items-center gap-2 bg-[#272727] p-1 rounded-md">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-2 rounded transition-colors",
              viewMode === 'grid' 
                ? "bg-[#323232] text-white" 
                : "text-gray-400 hover:text-white"
            )}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              "p-2 rounded transition-colors",
              viewMode === 'list' 
                ? "bg-[#323232] text-white" 
                : "text-gray-400 hover:text-white"
            )}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#272727] hover:border-red-500/50 transition-colors">
              <div className="aspect-video bg-[#272727] relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
                  {formatDuration(video.duration)}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white truncate">{video.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                  <span>{video.views.toLocaleString()} views</span>
                  <span>{formatDate(video.created_at)}</span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className={cn(
                    'px-2 py-1 rounded-full text-xs',
                    video.status === 'ready' ? 'bg-green-500/20 text-green-400' :
                    video.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  )}>
                    {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View
        <div className="space-y-4">
          {videos.map((video) => (
            <div key={video.id} className="bg-[#1a1a1a] rounded-lg border border-[#272727] hover:border-red-500/50 transition-colors">
              <div className="flex items-center p-4">
                <div className="w-48 aspect-video bg-[#272727] rounded relative flex-shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
                    {formatDuration(video.duration)}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-white">{video.title}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock size={16} />
                      {formatDate(video.created_at)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Upload size={16} />
                      {video.views.toLocaleString()} views
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className={cn(
                      'px-2 py-1 rounded-full text-xs',
                      video.status === 'ready' ? 'bg-green-500/20 text-green-400' :
                      video.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    )}>
                      {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};