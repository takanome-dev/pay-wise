export const JWT_KEYS = {
  JWT_PASSWD_SECRET: 'JWT_PASSWD_SECRET',
  JWT_PIN_SECRET: 'JWT_PIN_SECRET',
  JWT_CYPHER_KEY: 'JWT_CYPHER_KEY',
} as const;

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  CUSTOMER: 'customer',
} as const;

export const ROLES_KEY = 'roles';

export type Role = (typeof ROLES)[keyof typeof ROLES];

export enum OrderDirectionEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}
export const CC_NUMBER_LENGTH = 16;

export const visaPrefixes = [
  '4539',
  '4556',
  '4916',
  '4532',
  '4929',
  '4485',
  '4716',
  '4',
];

export const mastercardPrefixes = [
  '51',
  '52',
  '53',
  '54',
  '55',
  '2221',
  '2222',
  '2223',
  '2224',
  '2225',
  '2226',
  '2227',
  '2228',
  '2229',
  '223',
  '224',
  '225',
  '226',
  '227',
  '228',
  '229',
  '23',
  '24',
  '25',
  '26',
  '270',
  '271',
  '2720',
];
