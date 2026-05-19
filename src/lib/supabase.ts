import { createClient } from '@supabase/supabase-js';

// Environment variables provided via Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase URL or Key is missing. Please add them to your .env file.');
}

// Create a single supabase client for interacting with the database
export const supabase = createClient(supabaseUrl, supabaseKey);
