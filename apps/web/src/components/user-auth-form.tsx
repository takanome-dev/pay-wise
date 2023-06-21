'use client';

import autoAnimate from '@formkit/auto-animate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import type * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/form';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { toast } from '~/components/ui/use-toast';
import {
  errorSchema,
  registerSchema,
  successAuthSchema,
  userCredentialsSchema,
  userEmailSchema,
  type ErrorSchemaType,
  type SuccessAuthSchemaType,
} from '~/lib/schemas/auth';
import { cn } from '~/lib/utils';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement> & {
  path: 'login' | 'register';
};
type UserEmailSchema = z.infer<typeof userEmailSchema>;
type UserCredentialsSchema = z.infer<typeof userCredentialsSchema>;
type RegisterSchema = z.infer<typeof registerSchema>;

function Separator() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
  );
}

export function UserAuthForm({ className, path, ...props }: UserAuthFormProps) {
  const [isCredentialsForm, setIsCredentialsForm] = React.useState(true);
  const [isEmailForm, setIsEmailForm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = React.useState(false);
  const parent = React.useRef(null);
  const searchParams = useSearchParams();

  const emailForm = useForm<UserEmailSchema>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(userEmailSchema),
  });

  const credentialsForm = useForm<UserCredentialsSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(userCredentialsSchema),
  });

  const registerForm = useForm<RegisterSchema>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(registerSchema),
  });

  const toggleCredentialsForm = React.useCallback(() => {
    setIsEmailForm(false);
    setIsCredentialsForm(true);
  }, []);

  const toggleEmailForm = React.useCallback(() => {
    setIsEmailForm(true);
    setIsCredentialsForm(false);
  }, []);

  function onSubmitEmail(data: UserEmailSchema) {
    console.log({ data });
    setIsLoading(true);
    // const signInResult = await signIn('email', {
    //   email: data.email.toLowerCase(),
    //   redirect: false,
    //   callbackUrl: searchParams?.get('from') || '/dashboard',
    // });

    // console.log({ signInResult });
    setIsLoading(false);

    // if (!signInResult?.ok) {
    //   return toast({
    //     title: 'Something went wrong.',
    //     description: 'Your sign in request failed. Please try again.',
    //     variant: 'destructive',
    //   });
    // }

    return toast({
      title: 'Check your email',
      description: 'We sent you a login link. Be sure to check your spam too.',
    });
  }

  async function onSubmitCredentials(data: UserCredentialsSchema) {
    setIsLoading(true);

    const signInResult = await signIn('credentials', {
      ...data,
      // redirect: false,
      callbackUrl: searchParams?.get('from') || '/dashboard',
    });
    // console.log({ signInResult });

    setIsLoading(false);

    if (signInResult?.error) {
      return toast({
        title: 'Something went wrong.',
        description: signInResult.error,
        variant: 'destructive',
      });
    }

    return toast({
      title: 'Login successful.',
      description: 'You are now logged in.',
    });
  }

  async function onSubmitRegister(data: RegisterSchema) {
    setIsLoading(true);

    const resp = await fetch('http://localhost:3000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = (await resp.json()) as
      | ErrorSchemaType
      | SuccessAuthSchemaType;

    const parsedError = errorSchema.safeParse(result);

    if (parsedError.success) {
      setIsLoading(false);
      return toast({
        title: 'Something went wrong.',
        description: parsedError.data.message,
        variant: 'destructive',
      });
    }

    const parsedData = successAuthSchema.safeParse(result);

    if (!parsedData.success) {
      setIsLoading(false);
      return toast({
        title: 'Something went wrong.',
        description: 'Your sign up request failed. Please try again.',
        variant: 'destructive',
      });
    }

    const signInResult = await signIn('credentials', {
      email: data.email,
      password: data.password,
      // redirect: false,
      callbackUrl: searchParams?.get('from') || '/dashboard',
    });
    // console.log({ signInResult });

    setIsLoading(false);

    if (signInResult?.error) {
      return toast({
        title: 'Something went wrong.',
        description: signInResult.error,
        variant: 'destructive',
      });
    }

    return toast({
      title: 'Registration successful.',
      // eslint-disable-next-line quotes
      description: "You've been successfully registered.",
    });
  }

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className={cn('grid gap-6', className)} {...props} ref={parent}>
      {isCredentialsForm && path === 'login' && (
        <Form {...credentialsForm}>
          <form
            onSubmit={credentialsForm.handleSubmit(onSubmitCredentials)}
            className="space-y-6"
          >
            <FormField
              control={credentialsForm.control}
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
              control={credentialsForm.control}
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
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isGitHubLoading}
            >
              Login
            </Button>
          </form>
        </Form>
      )}
      {isCredentialsForm && path === 'register' && (
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(onSubmitRegister)}
            className="space-y-6"
          >
            <FormField
              control={registerForm.control}
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
              control={registerForm.control}
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
              control={registerForm.control}
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
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isGitHubLoading}
            >
              Sign up
            </Button>
          </form>
        </Form>
      )}
      {!isCredentialsForm && (
        <Button
          variant="outline"
          type="button"
          onClick={toggleCredentialsForm}
          disabled={isLoading || isGitHubLoading}
        >
          Sign in with credentials
        </Button>
      )}
      <Separator />
      {isEmailForm ? (
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(onSubmitEmail)}
            className="space-y-6"
          >
            <FormField
              control={emailForm.control}
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
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isGitHubLoading}
            >
              Sign In with Email
            </Button>
          </form>
        </Form>
      ) : (
        <Button
          variant="outline"
          type="button"
          onClick={toggleEmailForm}
          disabled={isLoading || isGitHubLoading}
        >
          Sign in with email
        </Button>
      )}
      <Separator />
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          setIsGitHubLoading(true);
          signIn('github').catch(console.error);
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{' '}
        Github
      </Button>
    </div>
  );
}
