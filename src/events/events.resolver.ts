import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FiltersInput, ObjectIdInput, ParseFiltersPipe } from '../common';
import { PaginationInput } from '../common/dto/PaginationInput.dto';
import { CreateEventInput } from './dto/CreateEventInput.dto';
import { PaginatedEventsOutput } from './dto/PaginatedEventsOutput.dto';
import { EventsService } from './events.service';
import { Event } from './schemas/event.schema';

@Resolver()
export class EventsResolver {
  constructor(private eventsService: EventsService) {}

  @Query(() => Event, { nullable: true, name: 'event' })
  async getById(@Args(ParseFiltersPipe) { id }: ObjectIdInput) {
    return this.eventsService.findById(id);
  }

  @Query(() => PaginatedEventsOutput, { name: 'events' })
  async getAll(
    @Args(ParseFiltersPipe)
    filterInput: FiltersInput,
    @Args() { limit, offset }: PaginationInput,
  ) {
    //TODO: Improve this typing or change validation approach
    const { count, result } = await this.eventsService.findAndCount(
      filterInput as any,
      limit,
      offset,
    );

    return {
      totalCount: count,
      elements: result,
      limit,
      offset,
    };
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
