import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ccuaybxdgtyvbpegockf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjdWF5YnhkZ3R5dmJwZWdvY2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NDcyOTIsImV4cCI6MjA5MDAyMzI5Mn0.7cGeSzYgTdPdH4B8nzG8_YOVBBsM99evoD1vOGOHLHU';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env file');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
