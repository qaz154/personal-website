import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export type Database = any; // Will be replaced with generated types

// Server-side client for Server Components
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore).get(name)?.value;
        },
        async set(name: string, value: string, options: any) {
          try {
            (await cookieStore).set(name, value, options);
          } catch {
            // Handle error
          }
        },
        async remove(name: string, options: any) {
          try {
            (await cookieStore).set(name, '', { ...options, maxAge: 0 });
          } catch {
            // Handle error
          }
        },
      },
    }
  );
}

// Client-side client for use in client components
export function createSupabaseBrowserClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Admin client with service role key
export function createSupabaseAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// Helper to get Supabase client based on context
export async function getSupabaseClient() {
  return createSupabaseServerClient();
}