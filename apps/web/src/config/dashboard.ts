import type { DashboardConfig } from '~/types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
      disabled: true,
    },
    {
      title: 'Support',
      href: '/support',
      disabled: true,
    },
  ],
  sidebarTopNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: 'dashboard',
    },
    {
      title: 'Cards',
      href: '/dashboard/cards',
      icon: 'wallet',
    },
    {
      title: 'Transactions',
      href: '/dashboard/transactions',
      icon: 'transaction',
    },
    {
      title: 'Statistics',
      href: '/dashboard/statistics',
      icon: 'statistic',
      disabled: true,
    },
  ],
  sidebarBottomNav: [
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
    },
    {
      title: 'Log out',
      href: '/logout',
      icon: 'logout',
      disabled: true,
    },
  ],
};
