import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class BaseSchema {
  @Field()
  _id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
