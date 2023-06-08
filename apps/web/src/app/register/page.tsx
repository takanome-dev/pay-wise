'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

// import type { Metadata } from 'next';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/form';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { registerSchema, type RegisterSchema } from '~/schemas/index.schema';

// const metadata: Metadata = {
//   title: 'Login',
//   description: 'Login page for the app.',
// };

export default function LoginPage() {
  // 1. Define your form.
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: RegisterSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="border-slate-500 dark:border-slate-700"
                      placeholder="johndoe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="border-slate-500 dark:border-slate-700"
                      placeholder="johndoe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="border-slate-500 dark:border-slate-700"
                      placeholder="supersecret"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
        </Form>
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
