import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const avatarImages = [
  'https://res.cloudinary.com/dafwzsod0/image/upload/v1687431852/user-avatar-1_cj4ldr.svg',
  'https://res.cloudinary.com/dafwzsod0/image/upload/v1687431892/user-avatar-2_sf24il.svg',
  'https://res.cloudinary.com/dafwzsod0/image/upload/v1687431907/user-avatar-3_zwo5ub.svg',
  'https://res.cloudinary.com/dafwzsod0/image/upload/v1687431921/user-avatar-4_zdqcbw.svg',
];
