import type { DefaultUser } from 'next-auth';

type UserId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId;
    role?: string;
    username?: string;
    access_token?: string;
  }
}

declare module 'next-auth' {
  export interface User extends DefaultUser {
    role?: string;
    username?: string;
    token?: string;
  }

  interface Session {
    user: User & {
      id: UserId;
      role?: string;
      username?: string;
    };
  }
}
