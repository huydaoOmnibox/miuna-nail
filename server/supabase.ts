import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Ensure environment variables are loaded
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate required environment variables
if (!supabaseUrl) {
  throw new Error('SUPABASE_URL environment variable is required. Please check your Vercel environment variables.');
}

if (!supabaseServiceKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY environment variable is required. Please check your Vercel environment variables.');
}

console.log('✅ Environment variables loaded successfully');
console.log('📡 Supabase URL:', supabaseUrl);
console.log('🔑 Supabase Key available:', !!supabaseServiceKey);
console.log('🌍 NODE_ENV:', process.env.NODE_ENV);
console.log('📋 Available env vars:', Object.keys(process.env).filter(key => key.includes('SUPABASE') || key.includes('DATABASE') || key.includes('JWT')));

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseServiceKey); 