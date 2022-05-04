import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import mongoose from 'mongoose';
import { AuthService } from '../../auth/services/auth.service';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { CreatePostDto } from '../dto/post.dto';
import { OrgRole } from '../enums/organization_role.enum';
import { Organization } from '../schemas/organization.schema';
import { OrganizationService } from '../services/organization.service';

@Injectable()
export class OrgRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
    private readonly organizationService: OrganizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRole = this.reflector.getAllAndOverride<OrgRole[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRole) {
        return true;
      }

      const data = context.switchToWs().getData();
      let orgID;
      let org: Organization;
      // createPostDto -> orgID
      // UpdateOrganizationDto -> orgID
      // get org id

      if (data.organization_id) {
        orgID = data.organization_id;
      } else if (data.orgId) {
        orgID = data.orgId;
      }

      const token = context
        .switchToWs()
        .getClient()
        .handshake.headers['authorization'].split(' ')[1];
      const accessToken = await this.authService.verifyToken(token);
      const userId = accessToken.user_id.toString();

      // Having orgID in input
      if (orgID) {
        org = await this.organizationService.getOrganizationById(orgID);
      }
      // Not Have orgID in input
      else if (!orgID) {
        org = await this.organizationService.getOrganizationByUser(userId);
      }

      // after initial org
      if (org) {
        const result = requiredRole.some((role) => {
          const checkUserRoleInOrg = org.participants.some((item) => {
            if (item.user._id.toString() === userId && item.role === role) {
              return true;
            }
          });

          if (checkUserRoleInOrg) {
            return true;
          }
        });

        return result;
      } else {
        return false;
      }

      // token 2: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI0MmI1NDlmMDMxNWUyMzA5MmY0ZTI3IiwiaWF0IjoxNjQ5ODE3MTc0LCJleHAiOjE2ODEzNTMxNzR9.C7Sdb_E9zUg8JyhcBC0Lud07K8zQpA9kABKTJTyGMc4
      // token 3: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI0NTE5ODM3NzIxMjU5NTQ3YTlkNDgwIiwiaWF0IjoxNjQ5NzM0MTk3LCJleHAiOjE2ODEyNzAxOTd9.EhI9GDqrgtWyhUQzuuijGsA7BDGiZbz-PZVIDGBjzWQ
      // token 4: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI0NTViMzg1NmI5M2JhOWU2MzRkZTU0IiwiaWF0IjoxNjQ5ODQxNDk0LCJleHAiOjE2ODEzNzc0OTR9.pjvmjG2w4opQy_JeuA8iZMiaeKno1hpca9tztxaGzkY
    } catch (err) {
      return false;
    }
  }
}
