import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { TaskRolesGuard } from 'src/task_managerment/guards/task_roles.guard';
import { AppGateway } from 'src/gateways/app.gateway';
import { TaskDto } from '../dto/task.dto';
import { Task } from '../schemas/task.schema';
import { TaskRole } from '../enums/task_role.enum';
import { Roles } from '../decorators/roles.decorator';

@UseGuards(TaskRolesGuard)
@WebSocketGateway(5000, { namespace: 'action' })
export class TaskManagermentGateway extends AppGateway {
  @SubscribeMessage('addTask')
  public async handleAddTask(client: Socket, taskDto: TaskDto): Promise<Task> {
    try {
      const user = await this.getUserClient(client);
      const newTask = await this.getTaskService.createTask(taskDto, user);
      return this.handleGetTaskById(client, newTask._id.toString());
    } catch (err) {
      return this.server.to(client.id).emit('error', {
        statusCode: 500,
        success: false,
        message: err.message,
      });
    }
  }

  @SubscribeMessage('searchByTaskName')
  public async handleSearchByTaskName(
    client: Socket,
    textName: string,
  ): Promise<any> {
    const user = await this.getUserClient(client);
    const tasks = await this.getTaskService.searchByTaskName(textName, user);
    return await this.server.to(client.id).emit('onSearchByTaskName', tasks);
  }

  @SubscribeMessage('getAllTask')
  public async handleGetAllTask(client: Socket): Promise<Task[]> {
    try {
      const user = await this.getUserClient(client);
      // console.log(user);

      const allTask = await this.getTaskService.findAllTaskByUser(user);
      // console.log(allTask);

      return this.server.to(client.id).emit('onGetAllTask', allTask);
    } catch (err) {
      return this.server.to(client.id).emit('error', {
        statusCode: 404,
        success: false,
        message: 'Task do not exist',
      });
    }
  }

  @Roles(TaskRole.Owner)
  @SubscribeMessage('deleteTask')
  public async handleDeleteTaskById(
    client: Socket,
    taskId: string,
  ): Promise<Task[]> {
    try {
      await this.getTaskService.deleteTaskById(taskId);
      return await this.handleGetAllTask(client);
    } catch (err) {
      return this.server.to(client.id).emit('error', {
        statusCode: 404,
        success: false,
        message: 'Task do not exist',
      });
    }
  }

  @Roles(TaskRole.Observer, TaskRole.User, TaskRole.Owner)
  @SubscribeMessage('getTaskById')
  public async handleGetTaskById(
    client: Socket,
    taskId: string,
  ): Promise<Task> {
    try {
      const taskById = await this.getTaskService.getTaskById(taskId);
      return await this.server.to(client.id).emit('onGetTaskById', taskById);
    } catch (err) {
      return this.server.to(client.id).emit('error', {
        statusCode: 404,
        success: false,
        message: 'Không tìm thấy tác vụ',
      });
    }
  }
}
