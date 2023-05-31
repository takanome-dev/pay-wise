import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY, Role } from '../utils/roles';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
