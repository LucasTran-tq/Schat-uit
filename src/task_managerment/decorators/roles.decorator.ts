import { SetMetadata } from '@nestjs/common';
import { TaskRole } from '../enums/task_role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TaskRole[]) => SetMetadata(ROLES_KEY, roles);
