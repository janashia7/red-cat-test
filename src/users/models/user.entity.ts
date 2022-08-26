import { Field, ObjectType } from '@nestjs/graphql';
import { RolesEnum } from '../enums/enum';
import { Document } from 'mongoose';
import { IsEnum } from 'class-validator';

// export class User {
//   username: string;
//   email: string;
//   phone: string;
//   role?: RoleEnum;
// }

@ObjectType()
export class UserEntity extends Document {
  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => [RolesEnum], { nullable: true })
  role?: RolesEnum[];
}
