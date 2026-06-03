import { supabase } from './supabase';

export async function uploadImage(file: File, folder: string = 'general'): Promise<string> {
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage.from('media').upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from('media').getPublicUrl(fileName);
  return data.publicUrl;
}
