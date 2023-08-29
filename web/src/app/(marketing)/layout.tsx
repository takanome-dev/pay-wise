import Link from 'next/link';

import { MainNav } from '~/components/main-nav';
import { ModeToggle } from '~/components/mode-toggle';
import { SiteFooter } from '~/components/site-footer';
import { buttonVariants } from '~/components/ui/button';
import { marketingConfig } from '~/config/marketing';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav className="flex gap-4">
            <ModeToggle />
            <Link
              href="/register"
              className={buttonVariants({ variant: 'outline' })}
            >
              Sign up
            </Link>
            <Link href="/login" className={buttonVariants()}>
              Signin
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
