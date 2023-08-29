import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auth Page',
  description: 'Login or register to the app.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
