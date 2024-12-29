import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const exportProjectAsZip = async () => {
  const zip = new JSZip();
  
  // Add a readme file
  zip.file('README.md', `# YouTube Reactor

A powerful platform for creating and managing YouTube reaction videos.

## Features
- Real-time video recording with custom layouts
- Template management system
- Asset library with stickers and overlays
- YouTube integration
- Affiliate program

## Getting Started
1. Install dependencies: \`npm install\`
2. Start development server: \`npm run dev\`
3. Build for production: \`npm run build\`

## Tech Stack
- React
- TypeScript
- Tailwind CSS
- Vite
- Supabase
`);

  try {
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'youtube-reactor.zip');
    return true;
  } catch (error) {
    console.error('Failed to create ZIP:', error);
    return false;
  }
};