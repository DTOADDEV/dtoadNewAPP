// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bvkpdnokoxlvmhirdrjl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2a3Bkbm9rb3hsdm1oaXJkcmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMDkwMzMsImV4cCI6MjA0OTU4NTAzM30.NrTZWtJHGqNGrw-n1zXcFwo8Zg5Br230t2LKY7m2y5c";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);