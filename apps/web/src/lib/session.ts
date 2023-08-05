import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function getCurrentUser() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getSession() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}
