import Link from 'next/link';

import type { Metadata } from 'next';

import { UserAuthForm } from '~/components/user-auth-form';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register an account to start using our service',
};

export default function RegisterPage() {
  return (
    <div className="container relative min-h-screen flex justify-center items-center mx-auto">
      {/* <div className="lg:p-8"> */}
      <div className="flex w-full flex-col justify-center space-y-6 sm:w-[400px] border border-slate-500 dark:border-slate-700 p-8 rounded-lg">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-muted-foreground text-sm">
            Register an account to start using our service
          </p>
        </div>
        <UserAuthForm path="register" />
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
          Already have an account?
          <Link
            href="/login"
            className="hover:text-primary underline underline-offset-4"
          >
            login here
          </Link>
        </p>
      </div>
      {/* </div> */}
    </div>
  );
}
