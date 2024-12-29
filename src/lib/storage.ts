import { supabase } from './supabase';

export const uploadVideo = async (file: File, userId: string) => {
  const filename = `${userId}/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('videos')
    .upload(filename, file);

  if (error) throw error;
  return data;
};

export const uploadThumbnail = async (file: File, userId: string) => {
  const filename = `${userId}/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('thumbnails')
    .upload(filename, file);

  if (error) throw error;
  return data;
};

export const getVideoUrl = async (path: string) => {
  const { data } = await supabase.storage
    .from('videos')
    .createSignedUrl(path, 3600); // 1 hour expiry

  return data?.signedUrl;
};

export const getThumbnailUrl = (path: string) => {
  return supabase.storage
    .from('thumbnails')
    .getPublicUrl(path).data.publicUrl;
};