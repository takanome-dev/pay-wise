import type { ApiConfigType } from './api.config';
import type { DbConfigType } from './db.config';

export * from './api.config';
export * from './db.config';

export type GlobalConfigType = {
  api: ApiConfigType;
  db: DbConfigType;
};
