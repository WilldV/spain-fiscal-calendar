import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../common';
import { EventDocument, Event } from './schemas/event.schema';

@Injectable()
export class EventsService extends BaseService<Event> {
  constructor(@InjectModel(Event.name) model: Model<EventDocument>) {
    super(model);
  }
}
