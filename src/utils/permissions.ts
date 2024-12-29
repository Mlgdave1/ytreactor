import { logger } from '../services/logger';

export const checkMediaPermissions = async () => {
  try {
    // First check if devices exist
    const devices = await navigator.mediaDevices.enumerateDevices();
    const hasCamera = devices.some(device => device.kind === 'videoinput');
    const hasMic = devices.some(device => device.kind === 'audioinput');
    
    if (!hasCamera || !hasMic) {
      return {
        granted: false,
        error: 'No camera or microphone found'
      };
    }

    return {
      granted: true,
      error: null
    };
  } catch (err: any) {
    logger.error('Permissions', 'Failed to check media permissions:', err);
    return {
      granted: false,
      error: 'Unable to check camera permissions'
    };
  }
};

export const getMediaStream = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        aspectRatio: 16/9
      },
      audio: true
    });

    return { stream, error: null };
  } catch (err: any) {
    logger.error('MediaStream', 'Failed to get media stream:', err);
    return { 
      stream: null, 
      error: err.name === 'NotAllowedError'
        ? 'Please allow camera access in your browser settings'
        : 'Unable to access camera'
    };
  }
};