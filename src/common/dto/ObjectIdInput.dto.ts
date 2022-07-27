import { ArgsType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@ArgsType()
export class ObjectIdInput {
  @Field()
  @IsMongoId()
  id: string;
}
