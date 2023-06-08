import Link from 'next/link';

export const metadata = {
  title: 'Auth Page',
  description: 'Login or register to the app.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // className={cn(
  //   inter.className,
  //   'bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200',
  // )}
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 h-16">
          <div className="container px-40 flex justify-between items-center h-full">
            <Link
              href="/"
              className="uppercase font-bold bg-black text-white p-4"
            >
              Pay Wise
            </Link>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
