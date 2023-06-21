import { notFound } from 'next/navigation';

import { MainNav } from '~/components/main-nav';
import { ModeToggle } from '~/components/mode-toggle';
import { DashboardNav } from '~/components/nav';
import { SiteFooter } from '~/components/site-footer';
import { UserAccountNav } from '~/components/user-account-nav';
import { dashboardConfig } from '~/config/dashboard';
import { getCurrentUser } from '~/lib/session';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();
  console.log({ user });

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-b-slate-400 bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <div className="flex gap-4">
            <ModeToggle />
            <UserAccountNav
              user={{
                name: 'Test',
                image: 'https://avatars.githubusercontent.com/u/79809121?v=4',
                email: 'test@gmail.com',
              }}
            />
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex pt-6 justify-between">
          <DashboardNav items={dashboardConfig.sidebarTopNav} />
          <DashboardNav
            items={dashboardConfig.sidebarBottomNav}
            className="pb-8"
          />
        </aside>
        <main className="flex w-full flex-1 pt-6 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t border-t-slate-400" />
    </div>
  );
}
