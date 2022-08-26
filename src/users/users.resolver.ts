import { RolesEnum } from './enums/enum';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from '../db/schema/user.schema';
import { CreateUsersInput } from './inputs/create-users-input';
import { UpdateUsersInput } from './inputs/update-users-input';
import { UpdateUserMsg } from './models/update.type';

import { UserEntity } from './models/user.entity';
import { UsersService } from './users.service';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUsersInput') createUsersInput: CreateUsersInput,
  ): Promise<User> {
    try {
      return await this.usersService.createUser(createUsersInput);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => UpdateUserMsg)
  async updateUser(
    @Args('phone') phone: string,
    @Args('updateUsersInput')
    updateUsersInput: UpdateUsersInput,
  ): Promise<UpdateUserMsg> {
    try {
      await this.usersService.updateUser(phone, updateUsersInput);
      return { message: `User has been updated` };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => UserEntity)
  async addRole(
    @Args('phone') phone: string,
    @Args('role', { type: () => [RolesEnum], nullable: true })
    role: RolesEnum[],
  ) {
    try {
      console.log(role);

      return await this.usersService.addRole(phone, role);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => UserEntity)
  async deleteRole(@Args('phone') phone: string): Promise<any> {
    try {
      console.log(phone, 'del');

      return this.usersService.deleteRole(phone);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
  }

  @Query(() => [UserEntity], { name: 'users', nullable: true })
  async getUsers(): Promise<UserEntity[]> {
    try {
      return await this.usersService.getUsers();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
  }
}
