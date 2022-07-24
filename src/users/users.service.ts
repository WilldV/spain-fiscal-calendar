import { BaseService } from '@common/classes/BaseService';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/users.schema';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectModel(User.name) model: Model<UserDocument>) {
    super(model);
  }
}
