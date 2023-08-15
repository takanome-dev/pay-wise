import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is signed in and the current path is / redirect the user to /account
  if (user && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/account', req.url));
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

// Refresh session if expired - required for Server Components
// https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
// await supabase.auth.getSession();
//   // eslint-disable-next-line consistent-return
//   async function middleware(req) {
//     const token = await getToken({ req });
//     console.log({ token });
//     const isAuth = !!token;
//     const isAuthPage =
//       req.nextUrl.pathname.startsWith('/login') ||
//       req.nextUrl.pathname.startsWith('/register');

//     if (isAuthPage) {
//       if (isAuth) {
//         return NextResponse.redirect(new URL('/dashboard', req.url));
//       }

//       return null;
//     }

//     if (!isAuth) {
//       let from = req.nextUrl.pathname;
//       if (req.nextUrl.search) {
//         from += req.nextUrl.search;
//       }

//       return NextResponse.redirect(
//         new URL(`/login?from=${encodeURIComponent(from)}`, req.url),
//       );
//     }
//   },
//   {
//     callbacks: {
//       authorized({ token }) {
//         console.log({ token });
//         // This is a work-around for handling redirect on auth pages.
//         // We return true here so that the middleware function above
//         // is always called.
//         return true;
//       },
//     },
//   },
// );

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
