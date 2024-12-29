import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTemplateStore } from '../store/templateStore';
import { VideoRecorder } from '../components/recorder/VideoRecorder';
import { logger } from '../services/logger';

export const RecorderPage: React.FC = () => {
  const location = useLocation();
  const loadTemplate = useTemplateStore(state => state.loadTemplate);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const templateId = params.get('template');
    
    if (templateId) {
      logger.info('RecorderPage', 'Loading template', { templateId });
      loadTemplate(templateId);
    }
  }, [location.search, loadTemplate]);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <VideoRecorder />
    </div>
  );
};