'use client';

import autoAnimate from '@formkit/auto-animate';
import { zodResolver } from '@hookform/resolvers/zod';
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
import useSupabaseAuth from '~/hooks/use-supabase-auth';
import { userCredentialsSchema } from '~/lib/schemas/auth';
import { cn } from '~/lib/utils';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement> & {
  path: 'login' | 'register';
};
type UserCredentialsSchema = z.infer<typeof userCredentialsSchema>;

function Separator() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t dark:border-t-slate-400" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
  );
}

/**
 *
 * @param root0
 * @param root0.className
 * @param root0.path
 */
export function UserAuthForm({ className, path, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = React.useState(false);

  const parent = React.useRef(null);
  const { signIn, signUp } = useSupabaseAuth();

  const credentialsForm = useForm<UserCredentialsSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(userCredentialsSchema),
  });

  async function onSubmitCredentials(data: UserCredentialsSchema) {
    setIsLoading(true);
    await signUp(data);
    setIsLoading(false);
  }

  React.useEffect(() => {
    /* eslint-disable-next-line */
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className={cn('grid gap-6', className)} {...props} ref={parent}>
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
                    type="password"
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
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {path === 'login' ? 'Login' : 'Register'}
          </Button>
        </form>
      </Form>
      <Separator />
      <Button
        variant="outline"
        type="button"
        onClick={async () => {
          setIsGitHubLoading(true);
          await signIn({ provider: 'github' });
          setIsGitHubLoading(false);
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
