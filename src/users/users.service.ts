import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../common';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectModel(User.name) model: Model<UserDocument>) {
    super(model);
  }
}
