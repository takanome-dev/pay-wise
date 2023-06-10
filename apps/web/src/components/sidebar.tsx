'use client';

import {
  History,
  LayoutDashboard,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { buttonVariants } from './ui/button';

import { cn } from '~/utils/merge-classnames';

interface SidebarLinkProps {
  path: string;
  text: string;
  Icon: LucideIcon;
}

const SidebarLink = (props: SidebarLinkProps) => {
  const { path, text, Icon } = props;
  const pathname = usePathname();

  return (
    <Link
      className={buttonVariants({
        variant: 'ghost',
        size: 'lg',
        className: cn(
          'w-full !justify-start text-slate-500 hover:bg-blue-50 hover:text-slate-600 focus:ring-0',
          {
            'text-blue-500 hover:text-blue-600': pathname === path,
          },
        ),
      })}
      href={path}
    >
      <Icon className={cn('h-5 w-5  lg:h-6 lg:w-6')} />
      <p className={cn('ml-4 text-base', 'hidden lg:block')}>{text}</p>
    </Link>
  );
};

const Sidebar = () => {
  console.log('Sidebar');

  return (
    <div className="h-screen px-2 py-8">
      <div className="mb-8">
        <Link href="/" className="uppercase font-bold pl-8">
          Pay Wise
        </Link>
      </div>
      <div className="">
        <span className="ml-8 text-sm font-semibold text-slate-400">Menu</span>
        <ul className="grid grid-flow-row auto-rows-max mt-4">
          <SidebarLink
            path="/dashboard"
            text="Dashboard"
            Icon={LayoutDashboard}
          />
          <SidebarLink path="/" text="Cards" Icon={Wallet} />
          <SidebarLink path="/" text="History" Icon={History} />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
