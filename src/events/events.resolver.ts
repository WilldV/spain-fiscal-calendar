import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEventInput } from './dto/CreateEventInput.dto';
import { EventsService } from './events.service';
import { Event } from './schemas/event.schema';

@Resolver()
export class EventsResolver {
  constructor(private eventsService: EventsService) {}

  @Query(() => Event, { nullable: true, name: 'event' })
  async getById(@Args('id') id: string) {
    return this.eventsService.findById(id);
  }

  @Query(() => [Event], { name: 'events' })
  async getAll() {
    return this.eventsService.find({});
  }

  @Mutation(() => Event, { name: 'createEvent' })
  async create(@Args() input: CreateEventInput) {
    return this.eventsService.create(input);
  }

  @Mutation(() => Event, { nullable: true, name: 'updateEventById' })
  async update(@Args('id') id: string, @Args() input: CreateEventInput) {
    return this.eventsService.updateById(id, input);
  }

  @Mutation(() => Event, { nullable: true, name: 'deleteEventById' })
  async deleteById(@Args('id') id: string) {
    return this.eventsService.deleteById(id);
  }
}
