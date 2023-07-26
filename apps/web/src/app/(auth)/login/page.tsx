import Link from 'next/link';

import type { Metadata } from 'next';

import { UserAuthForm } from '~/components/user-auth-form';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login page for the app.',
};

export default function LoginPage() {
  // const supabase = createClientComponentClient()

  // const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `${location.origin}/auth/callback`,
  //     },
  //   })
  //   setView('check-email')
  // }

  // const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   })
  //   router.push('/')
  //   router.refresh()
  // }
  return (
    <div className="container relative min-h-screen flex justify-center items-center mx-auto">
      {/* <div className="lg:p-8"> */}
      <div className="flex w-full flex-col justify-center space-y-6 sm:w-[400px] border border-slate-500 dark:border-slate-700 p-8 rounded-lg">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login to your account
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your credentials below to log in into your account
          </p>
        </div>
        <UserAuthForm path="login" />
        <p className="text-muted-foreground px-8 text-center text-sm">
          By clicking continue, you agree to our{' '}
          <Link
            href="/terms"
            className="hover:text-primary underline underline-offset-4"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="hover:text-primary underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <p className="text-muted-foreground flex justify-between items-center">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="hover:text-primary underline underline-offset-4"
          >
            register here
          </Link>
        </p>
      </div>
      {/* </div> */}
    </div>
  );
}
