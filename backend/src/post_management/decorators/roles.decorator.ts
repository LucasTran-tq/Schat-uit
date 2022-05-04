import { SetMetadata } from '@nestjs/common';
import { OrgRole } from '../enums/organization_role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: OrgRole[]) => SetMetadata(ROLES_KEY, roles);
