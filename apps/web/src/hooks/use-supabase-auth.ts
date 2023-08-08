import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

import type {
  Session,
  SignInWithOAuthCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';

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
      console.log({ realtimeState: state });
      setSession(state);
    });

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return {
    signIn: (data: SignInWithOAuthCredentials) =>
      supabase.auth.signInWithOAuth({
        ...data,
        options: data.options ?? {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      }),
    signUp: (data: SignUpWithPasswordCredentials) =>
      supabase.auth.signUp({
        ...data,
        options: data.options ?? {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      }),
    signOut: () => supabase.auth.signOut(),
    session,
  };
};

export default useSupabaseAuth;
