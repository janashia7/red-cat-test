import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RolesEnum } from '../enums/enum';

@InputType()
export class CreateUsersInput {
  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  email: string;

  @Field()
  @IsString()
  phone: string;

  @Field(() => [RolesEnum], { nullable: true })
  role?: RolesEnum[];
}
