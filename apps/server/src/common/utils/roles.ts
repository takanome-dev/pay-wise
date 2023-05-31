export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  CUSTOMER: 'customer',
} as const;

export const ROLES_KEY = 'roles';

export type Role = typeof ROLES[keyof typeof ROLES];
