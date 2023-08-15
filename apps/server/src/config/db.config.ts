import { registerAs } from '@nestjs/config';

export type DbConfigType = ReturnType<typeof DbConfig>;

export const DbConfig = registerAs('db', () => ({
  connection: String(process.env.TYPEORM_CONNECTION),
  host: String(process.env.TYPEORM_HOST),
  port: Number(process.env.TYPEORM_PORT),
  username: String(process.env.TYPEORM_USERNAME),
  password: String(process.env.TYPEORM_PASSWORD),
  database: String(process.env.TYPEORM_DATABASE),
  // certificate: String(process.env.TYPEORM_SSL_CERT ?? "-----------------------------"),
  // maxQueryExecutionTime: Number(parseInt(process.env.TYPEORM_MAX_QUERY_EXECUTION_TIME
  // ?? "10000", 10)),
}));

export default DbConfig;
