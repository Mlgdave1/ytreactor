export const extractYouTubeId = (url: string): string | null => {
  try {
    if (!url.trim()) return null;

    // Handle youtu.be URLs
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split(/[#?]/)[0];
      return id || null;
    }

    // Handle youtube.com URLs
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('youtube.com')) {
      return urlObj.searchParams.get('v');
    }

    // Handle direct video IDs
    if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
      return url.trim();
    }

    return null;
  } catch {
    return null;
  }
};