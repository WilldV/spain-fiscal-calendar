import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsService } from './events.service';
import { Event, EventSchema } from './schemas/event.schema';
import { EventsResolver } from './events.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  providers: [EventsService, EventsResolver],
})
export class EventsModule {}
