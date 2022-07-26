import { ArgsType, Field } from '@nestjs/graphql';
import { ContentInput } from './CreateEventInput.dto';

@ArgsType()
export class UpdateEventInput {
  @Field()
  startDate?: Date;

  @Field()
  endDate: Date;

  @Field()
  title: string;

  @Field(() => [ContentInput])
  content: ContentInput[];
}
