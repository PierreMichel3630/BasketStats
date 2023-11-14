import { supabase } from "./supabaseClient";

export const BUCKET_LANGUAGE = "language";
export const BUCKET_PLAYER = "player";
export const BUCKET_TEAM = "team";

export const URL_STORAGE =
  "https://cvkiuxywllpahhzjccxd.supabase.co/storage/v1/object/public/";

export const storeFile = (bucket: string, filePath: string, file: File) =>
  supabase.storage.from(bucket).upload(filePath, file);

export const getUrlPublic = (bucket: string, filePath: string) =>
  URL_STORAGE + bucket + "/" + filePath;
