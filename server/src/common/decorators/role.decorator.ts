import { SetMetadata } from '@nestjs/common';

import { ROLES_KEY, type Role } from '../utils/constants';

/**
 *
 * @param {...any} roles
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
