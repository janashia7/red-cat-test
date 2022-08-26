import { RolesEnum } from './enums/enum';
import { Injectable } from '@nestjs/common';
import { CreateUsersInput } from './inputs/create-users-input';
import { UpdateUsersInput } from './inputs/update-users-input';
import { User } from '../db/schema/user.schema';
import { UserRepository } from 'src/db/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUsersInput: CreateUsersInput) {
    return await this.userRepository.createUser(createUsersInput);
  }

  async updateUser(phone: string, updateUsersInput: UpdateUsersInput) {
    return await this.userRepository.updateUser(phone, updateUsersInput);
  }

  async addRole(phone: string, role: RolesEnum[]) {
    console.log(role, 'aqa');

    return await this.userRepository.addRole(phone, role);
  }

  async deleteRole(phone: string) {
    console.log(phone, 'del iqi');

    return await this.userRepository.deleteUserRole(phone);
  }

  async getUsers() {
    return await this.userRepository.getUsers();
  }
}
