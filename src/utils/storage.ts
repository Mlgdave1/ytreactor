export const generateFileName = (prefix: string = 'recording'): string => {
  const date = new Date();
  const timestamp = date.toISOString().replace(/[:.]/g, '-');
  return `${prefix}-${timestamp}.webm`;
};

export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};