import { ObjectType } from '@nestjs/graphql';
import { PaginatedOutput } from '../../common';
import { Event } from '../schemas/event.schema';

@ObjectType()
export class PaginatedEventsOutput extends PaginatedOutput(Event) {}
