import { SetMetadata } from '@nestjs/common';

import { ROLES_KEY, type Role } from '../utils/constants';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
