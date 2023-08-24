import { registerAs } from '@nestjs/config';

export type ApiConfigType = ReturnType<typeof ApiConfig>;

export const ApiConfig = registerAs('api', () => ({
  codename: String(process.env.API_CODENAME),
  logging: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
  host: String(process.env.API_HOST),
  port: Number(process.env.API_PORT),
  domain: String(process.env.API_DOMAIN),
  development: Boolean(!process.env.CI),
  memory_heap: Number(parseInt(process.env.MEMORY_HEAP, 10) * 1024 * 1024),
  memory_rss: Number(parseInt(process.env.MEMORY_RSS, 10) * 1024 * 1024),
  disk_percentage: Number(parseFloat(process.env.DISK_PERCENTAGE)),
  disk_size: Number(parseInt(process.env.DISK_SIZE, 10) * 1024 * 1024 * 1024),
}));

export default ApiConfig;
