// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cfhvfsfnremkhdcjothy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmaHZmc2ZucmVta2hkY2pvdGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MzU2NDYsImV4cCI6MjA1OTMxMTY0Nn0.5iy08ye7wNXelDqUQXTGVapnWksF5XP5QMVFAkTVEiM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);