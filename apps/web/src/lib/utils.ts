import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const avatarImages = [
  'https://asset.cloudinary.com/dafwzsod0/050ce1bf4ab920ea29dcf4f9b0114760',
  'https://asset.cloudinary.com/dafwzsod0/a9d7e3bd2b79b108453fcec7236252df',
  'https://asset.cloudinary.com/dafwzsod0/5a2f42a74f4a2b965e1d7c5747342ae2',
  'https://asset.cloudinary.com/dafwzsod0/92b0eb817c2d6142dfdd95a04f7db868',
];
