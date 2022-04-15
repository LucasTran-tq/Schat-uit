import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { User } from 'src/auth/schemas/user.schema';
import {
  CheckListDto,
  ItemDto,
  TaskDto,
  TaskParticipantDto,
} from '../dto/task.dto';
import { TaskRole } from '../enums/task_role.enum';
import { TaskRepository } from '../repositories/task.repository';
import { TaskCategoryRepository } from '../repositories/task_category.repository';
import { CheckList, Item, Task, TaskParticipant } from '../schemas/task.schema';
export class UserRoles {
  user: User;
  role: string[];
}

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
    private readonly taskCategoryRepository: TaskCategoryRepository,
  ) {}

  public async createTask(taskDto: TaskDto, author: User): Promise<Task> {
    const {
      task_category_id,
      check_lists,
      observers_id,
      participants_id,
      owner_id,
      ...task_el
    } = taskDto;
    const observers = [];
    const participants = [];
    const owner = await this.userRepository.findByID(owner_id);
    const taskCategory = await this.taskCategoryRepository.getOne({
      _id: taskDto.task_category_id,
    });
    const checkLists: CheckList[] = [];
    const itemsList: Item[] = [];
    const taskParticipantsList: TaskParticipant[] = [];

    //TODO: handle convert user_id to user
    const checkListPromise = check_lists.map(
      async (checkList: CheckListDto, index: number): Promise<CheckList> => {
        const { items, ...check_list_el } = checkList;
        //Return Items promise
        const itemsPromise = items.map(
          async (item: ItemDto, index: number): Promise<Item> => {
            const { task_participants, ...item_el } = item;
            //Return Participants promise
            const taskParticipantsPromise = task_participants.map(
              async (
                taskParticipant: TaskParticipantDto,
                index: number,
              ): Promise<TaskParticipant> => {
                const { user_id, ...task_participant_el } = taskParticipant;
                const user = await this.userRepository.findByID(
                  taskParticipant.user_id,
                );
                return { user: user, ...task_participant_el };
              },
            );

            //Return Participants
            for (let i = 0; i < taskParticipantsPromise.length; i++) {
              taskParticipantsList.push(await taskParticipantsPromise[i]);
            }
            return {
              index: index,
              task_participants: taskParticipantsList,
              ...item_el,
            };
          },
        );
        //Return Items
        for (let i = 0; i < itemsPromise.length; i++) {
          itemsList.push(await itemsPromise[i]);
        }
        return {
          index: index,
          items: itemsList,
          ...check_list_el,
        };
      },
    );

    for (let i = 0; i < checkListPromise.length; i++) {
      checkLists.push(await checkListPromise[i]);
    }

    //TODO: hanlde observers
    const observerPromise = observers_id.map(
      async (observerId) => await this.userRepository.findByID(observerId),
    );
    for (let i = 0; i < observerPromise.length; i++) {
      observers.push(await observerPromise[i]);
    }

    //TODO: hanlde participants
    const participantsPromise = participants_id.map(
      async (participantsId) =>
        await this.userRepository.findByID(participantsId),
    );
    for (let i = 0; i < participantsPromise.length; i++) {
      participants.push(await participantsPromise[i]);
    }

    return await this.taskRepository.create({
      task_category: taskCategory,
      observer: observers,
      participants: participants,
      owner: owner,
      check_list: checkLists,
      created_by: author,
      ...task_el,
    });
  }

  public async findAllTaskByTaskCategory(
    taskCategoryId: string,
  ): Promise<Task[]> {
    const taskGroup = await this.taskCategoryRepository.getOne({
      _id: taskCategoryId,
    });
    return await this.taskRepository.findAll({
      task_group: { $in: [taskGroup] },
    });
  }

  public async findAllTaskByUser(user: User): Promise<Task[]> {
    return await this.taskRepository.findAll({
      participants: {
        $elemMatch: {
          _id: user._id,
        },
      },
    });
  }

  public async gellAllRolesOnTaskByUser(
    userId: string,
    taskId: string,
  ): Promise<any> {
    const task = await this.getTaskById(taskId);
    const ownerId = task.owner._id.toString();
    const roles = [];
    const participants = task.participants;
    const observers = task.observer;

    //TODO: Hanlde find user roles in task
    if (participants.length != 0) {
      let participantId = participants
        .find((participant) => participant._id.toString() == userId)
        ._id.toString();
      console.log(participantId);
      if (userId == participantId) roles.push(TaskRole.User);
    }
    if (observers.length != 0) {
      let observerId = observers
        .find((observer) => observer._id.toString() == userId)
        ._id.toString();
      console.log(observerId);
      if (userId == observerId) roles.push(TaskRole.Observer);
    }
    if (userId == ownerId) roles.push(TaskRole.Owner);
    return roles;
  }

  public async getParticipantsOnTask(taskId: string): Promise<User[]> {
    const taskById = await this.taskRepository.findOne({ _id: taskId });
    const participants = [];
    taskById.participants.map((participant) => participants.push(participant));
    return participants;
  }

  public async getTaskById(taskId: string): Promise<Task> {
    return await this.taskRepository.findOne({ _id: taskId });
  }

  public async searchByTaskName(taskName: string, user: User): Promise<Task[]> {
    const tasks = await this.taskRepository.findAll({
      task_name: { $regex: `.*${taskName}.*` },
      participants: {
        $elemMatch: {
          _id: user._id,
        },
      },
    });
    return tasks;
  }

  public async deleteTaskById(taskId: string): Promise<Task> {
    return await this.taskRepository.deleteById(taskId);
  }
}
