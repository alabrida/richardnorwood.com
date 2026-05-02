import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // During build time, these might be missing.
    // Return a dummy client or throw a descriptive error that we can catch
    // But since this is a client component, it will run in the browser where they should be present.
    // For prerendering, we can return null and handle it in the component.
    return null as any;
  }

  return createBrowserClient(url, key)
}
