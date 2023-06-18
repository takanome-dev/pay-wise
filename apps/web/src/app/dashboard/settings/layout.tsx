import { Divider } from '@tremor/react';

import { Sidebar } from './components/sidebar';

import type { Metadata } from 'next';

import { DashboardHeader } from '~/components/header';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Settings for your account.',
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
    <div className="hidden pb-16 md:block">
      <DashboardHeader
        heading="Settings"
        text="Manage your account settings and set e-mail preferences."
      />
      <Divider className="" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 gap-8">
        <aside className="lg:w-1/6">
          <Sidebar items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
