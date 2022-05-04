import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TaskService } from 'src/task_managerment/services/task.service';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { TaskRole } from '../enums/task_role.enum';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class TaskRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
    private readonly taskService: TaskService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRole = this.reflector.getAllAndOverride<TaskRole[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRole) {
        return true;
      }
      const taskId = context.switchToWs().getData();

      const token = context
        .switchToWs()
        .getClient()
        .handshake.headers['authorization'].split(' ')[1];
      const accessToken = await this.authService.verifyToken(token);
      const userId = accessToken.user_id.toString();
      const user = await this.authService.findUserById(userId);
      console.log(user);

      const rolesByUser = await this.taskService.gellAllRolesOnTaskByUser(
        user._id.toString(),
        taskId,
      );
      console.log(rolesByUser);

      return requiredRole.some((role) => rolesByUser?.includes(role));
    } catch (err) {
      return false;
    }
  }
}
