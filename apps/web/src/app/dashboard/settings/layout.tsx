import { Divider } from '@tremor/react';
import Image from 'next/image';

import { Sidebar } from './components/sidebar';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.',
};

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/dashboard/settings',
  },
  {
    title: 'Account',
    href: '/dashboard/settings/account',
  },
  {
    title: 'Appearance',
    href: '/dashboard/settings/appearance',
  },
  {
    title: 'Notifications',
    href: '/dashboard/settings/notification',
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Divider className="" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <Sidebar items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
