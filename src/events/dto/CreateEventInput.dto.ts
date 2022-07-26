import { ArgsType, Field, InputType } from '@nestjs/graphql';

@ArgsType()
export class CreateEventInput {
  @Field({ nullable: true })
  startDate?: Date;

  @Field()
  endDate: Date;

  @Field()
  title: string;

  @Field(() => [ContentInput])
  content: ContentInput[];

  @Field(() => [String], { nullable: true })
  tags?: string[];
}

@InputType()
export class ContentInput {
  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  secondText?: string;

  @Field(() => [FirstLevelInput])
  firstLevel: FirstLevelInput[];
}

@InputType()
export class FirstLevelInput {
  @Field()
  text: string;

  @Field({ nullable: true })
  secondText?: string;

  @Field(() => [SecondLevelInput], { nullable: true })
  secondLevel?: SecondLevelInput[];
}

@InputType()
export class SecondLevelInput {
  @Field()
  text: string;

  @Field({ nullable: true })
  secondText?: string;
}
