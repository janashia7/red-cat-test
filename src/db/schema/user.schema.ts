import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RolesEnum } from '../../users/enums/enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true, unique: true })
  phone: string;

  @Prop({ enum: RolesEnum, type: Array, })
  role?: RolesEnum[];
}

export const UserSchema = SchemaFactory.createForClass(User);
