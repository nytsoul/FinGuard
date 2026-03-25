import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ccuaybxdgtyvbpegockf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjdWF5YnhkZ3R5dmJwZWdvY2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NDcyOTIsImV4cCI6MjA5MDAyMzI5Mn0.7cGeSzYgTdPdH4B8nzG8_YOVBBsM99evoD1vOGOHLHU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
