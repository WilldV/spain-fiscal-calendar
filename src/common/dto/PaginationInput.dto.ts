import { ArgsType, Field } from '@nestjs/graphql';
import { Min } from 'class-validator';

@ArgsType()
export class PaginationInput {
  @Field()
  @Min(1)
  limit: number;

  @Field()
  @Min(0)
  offset: number;
}
