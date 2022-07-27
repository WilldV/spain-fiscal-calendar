import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from '../../common';

export enum UserRole {
  USER,
  ADMIN,
}

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends BaseSchema {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ type: String, enum: Object.values(UserRole), required: true })
  role: UserRole;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String] })
  tags?: string[];

  validatePassword: (pass: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);
