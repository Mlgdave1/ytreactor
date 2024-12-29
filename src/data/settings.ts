export const SETTINGS = {
  recording: {
    defaultQuality: '1080p',
    autoSave: true,
    saveLocation: 'downloads',
    format: 'webm',
    codec: 'vp8',
    audioCodec: 'opus',
    videoBitrate: '2500k',
    audioBitrate: '128k',
    frameRate: 30
  },
  youtube: {
    defaultPrivacy: 'private',
    defaultCategory: 'Entertainment',
    autoUpload: false,
    defaultTags: ['reaction', 'ytreactor'],
    defaultDescription: 'Recorded with YouTube Reactor'
  },
  interface: {
    theme: 'dark',
    showTips: true,
    autoHideControls: true,
    defaultLayout: 'side-by-side',
    showTimestamps: true
  },
  shortcuts: {
    toggleRecording: 'Alt+R',
    pauseRecording: 'Alt+P',
    toggleCamera: 'Alt+C',
    toggleMicrophone: 'Alt+M',
    saveRecording: 'Alt+S'
  }
};