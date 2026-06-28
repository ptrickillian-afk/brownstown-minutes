import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Meeting = {
  id: string;
  township_id: string;
  meeting_date: string;
  title: string | null;
  minutes_text: string | null;
  podcast_script: string | null;
  audio_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Township = {
  id: string;
  slug: string;
  name: string;
  created_at: string;
};
