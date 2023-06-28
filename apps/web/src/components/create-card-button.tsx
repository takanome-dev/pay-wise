'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import * as React from 'react';

import type { User } from 'next-auth';

import { Icons } from '~/components/icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { buttonVariants, type ButtonProps } from '~/components/ui/button';
import { toast } from '~/components/ui/use-toast';
import { getCurrentUser } from '~/lib/session';
import { cn } from '~/lib/utils';

interface CreateCardButtonProps extends ButtonProps {
  user: User;
}

export function CreateCardButton({
  className,
  variant,
  user,
  ...props
}: CreateCardButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);

  // 'brand',
  // 'type',
  // 'currency',
  // 'user_id'

  async function onClick() {
    setIsLoading(true);
    const response = await fetch('http://localhost:3000/api/v1/cards/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        title: 'Untitled Post',
      }),
    });
    setIsLoading(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowAlert(true)}
        className={cn(
          buttonVariants({ variant }),
          {
            'cursor-not-allowed opacity-60': isLoading,
          },
          className,
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.add className="mr-2 h-4 w-4" />
        )}
        New Card
      </button>
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create a new card</AlertDialogTitle>
            {/* <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription> */}
          </AlertDialogHeader>
          <div>
            <p>Form goes here :)</p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => console.log('create card')}
              className=""
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Create card</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
