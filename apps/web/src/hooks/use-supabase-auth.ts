import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

import type {
  Session,
  SignInWithOAuthCredentials,
} from '@supabase/supabase-js';

import { env } from '~/env';

const useSupabaseAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUserSession() {
      const currentUser = await supabase.auth.getSession();
      setSession(currentUser.data.session);
    }

    getUserSession().catch(console.error);

    const {
      data: { subscription: listener },
    } = supabase.auth.onAuthStateChange((_, state) => {
      setSession(state);
    });

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return {
    signIn: (data: SignInWithOAuthCredentials) => {
      supabase.auth
        .signInWithOAuth({
          ...data,
          options: data.options ?? {
            redirectTo: env.NEXT_PUBLIC_APP_URL ?? '/',
          },
        })
        .catch(console.error);
    },
    signOut: () => supabase.auth.signOut(),
    session,
  };
};

export default useSupabaseAuth;
