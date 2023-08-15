'use client';

import Link from 'next/link';

import type { Session } from '@supabase/supabase-js';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { UserAvatar } from '~/components/user-avatar';
import useSupabaseAuth from '~/hooks/use-supabase-auth';

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Session['user'];
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const { signOut } = useSupabaseAuth();

  const name = (user.user_metadata?.user_name as string) ?? '';
  const avatar = (user?.user_metadata?.avatar_url as string) ?? '';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:ring-0">
        <UserAvatar name={name} image={avatar} className="h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-slate-400 bg-background"
      >
        <div className="flex items-center justify-start gap-2 p-2">
          {avatar && (
            <UserAvatar name={name} image={avatar} className="h-10 w-10" />
          )}
          <div className="flex flex-col space-y-1 leading-none">
            {name && <p className="font-medium">{name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/cards">Cards</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut().catch(console.error);
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
