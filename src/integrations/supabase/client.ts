// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://oifwifoaqyuqoddqthnx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pZndpZm9hcXl1cW9kZHF0aG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MjIxMTUsImV4cCI6MjA2MzE5ODExNX0.16AfgaVQr2pfK6JrMXdQ3kKlVQljKy6JfTSNo1gckXU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);