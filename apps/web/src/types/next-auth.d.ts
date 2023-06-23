import type { DefaultUser } from 'next-auth';

type UserId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId;
    role?: string;
    username?: string;
  }
}

declare module 'next-auth' {
  export interface User extends DefaultUser {
    role?: string;
    username?: string;
  }

  interface Session {
    user: User & {
      id: UserId;
      role?: string;
      username?: string;
    };
  }
}
