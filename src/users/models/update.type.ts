import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateUserMsg {
  @Field()
  message: string;
}
