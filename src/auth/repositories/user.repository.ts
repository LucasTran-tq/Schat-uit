import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model, FilterQuery } from 'mongoose';
@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  public async getAllUser(userFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(userFilterQuery);
  }

  public async getUser(userFilterQuery: FilterQuery<User>): Promise<User> {
    return await this.userModel.findOne(userFilterQuery);
  }

  public async updateUser(
    userId: string,
    userFilterQuery: FilterQuery<User>,
  ): Promise<User> {
    return await this.userModel.findByIdAndUpdate(userId, userFilterQuery);
  }

  public async findByID(user_id: string): Promise<User> {
    return await this.userModel.findById({ _id: user_id });
  }

  // public async updateDisconnectedTimeUser(
  //   user_id: string,
  //   disconnected_time: Date,
  // ): Promise<User> {
  //   return await this.userModel.findOneAndUpdate(
  //     { _id: user_id },
  //     { disconnected_time },
  //   );
  // }
}
