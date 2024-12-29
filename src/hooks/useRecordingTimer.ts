import { useState, useEffect } from 'react';

export const useRecordingTimer = (isRecording: boolean) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRecording) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording]);

  const formattedTime = new Date(seconds * 1000).toISOString().substr(11, 8);

  return { seconds, formattedTime };
};