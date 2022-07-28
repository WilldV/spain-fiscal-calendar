import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FiltersInput, ObjectIdInput, ParseFiltersPipe } from '../common';
import { CreateEventInput } from './dto/CreateEventInput.dto';
import { EventsService } from './events.service';
import { Event } from './schemas/event.schema';

@Resolver()
export class EventsResolver {
  constructor(private eventsService: EventsService) {}

  @Query(() => Event, { nullable: true, name: 'event' })
  async getById(@Args(ParseFiltersPipe) { id }: ObjectIdInput) {
    return this.eventsService.findById(id);
  }

  @Query(() => [Event], { name: 'events' })
  async getAll(
    @Args(ParseFiltersPipe)
    filterInput: FiltersInput,
  ) {
    //TODO: Improve this typing or change validation approach
    return this.eventsService.find(filterInput as any);
  }

  @Mutation(() => Event, { name: 'createEvent' })
  async create(@Args() input: CreateEventInput) {
    return this.eventsService.create(input);
  }

  @Mutation(() => Event, { nullable: true, name: 'updateEventById' })
  async update(@Args() { id }: ObjectIdInput, @Args() input: CreateEventInput) {
    return this.eventsService.updateById(id, input);
  }

  @Mutation(() => Event, { nullable: true, name: 'deleteEventById' })
  async deleteById(@Args() { id }: ObjectIdInput) {
    return this.eventsService.deleteById(id);
  }
}
