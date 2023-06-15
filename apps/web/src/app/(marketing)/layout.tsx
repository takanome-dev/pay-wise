import Link from 'next/link';

import { MainNav } from '~/components/main-nav';
import { SiteFooter } from '~/components/site-footer';
import { buttonVariants } from '~/components/ui/button';
import { marketingConfig } from '~/config/marketing';
import { cn } from '~/lib/utils';

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
            <Link
              href="/register"
              className={buttonVariants({ variant: 'outline' })}
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className={buttonVariants({ variant: 'default' })}
            >
              Signin
            </Link>
          </nav>
          {/* <nav>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              Login
            </Link>
          </nav> */}
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
