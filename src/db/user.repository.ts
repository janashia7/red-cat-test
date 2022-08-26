import { RolesEnum } from './../users/enums/enum';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUsersInput } from '../users/inputs/create-users-input';
import { User, UserDocument } from './schema/user.schema';
import { UpdateUsersInput } from '../users/inputs/update-users-input';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUsersInput: CreateUsersInput): Promise<User> {
    await this.userModel.create(createUsersInput);
    return this.userModel.findOne({ phone: createUsersInput.phone });
  }

  async updateUser(phone: string, updateUsersInput: UpdateUsersInput) {
    return this.userModel.findOneAndUpdate({ phone }, updateUsersInput);
  }

  async addRole(phone: string, role: RolesEnum[]) {
    await this.userModel.updateOne({ phone }, { role });
    return this.userModel.findOne({ phone });
  }

  async deleteUserRole(phone: string) {
    const user = await this.userModel.findOne({ phone });

    user.role = undefined;
    return user.save();
  }

  async getUsers() {
    return await this.userModel.find();
  }
}
