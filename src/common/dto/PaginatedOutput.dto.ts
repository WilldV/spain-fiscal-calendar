import { Type } from '@nestjs/common';
import { ObjectType, Field, Int } from '@nestjs/graphql';

export interface IPaginatedType<T> {
  elements: T[];
  totalCount: number;
  limit: number;
  offset: number;
}

export function PaginatedOutput<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef], { nullable: true })
    elements: T[];

    @Field(() => Int)
    totalCount: number;

    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    offset: number;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
