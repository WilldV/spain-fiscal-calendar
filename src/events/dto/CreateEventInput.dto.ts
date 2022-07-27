import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';

@ArgsType()
export class CreateEventInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @Field()
  @IsDate()
  endDate: Date;

  @Field()
  @IsNotEmpty()
  title: string;

  @Field(() => [ContentInput])
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentInput)
  content: ContentInput[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  tags?: string[];
}

@InputType()
export class ContentInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  text?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  secondText?: string;

  @Field(() => [FirstLevelInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FirstLevelInput)
  firstLevel: FirstLevelInput[];
}

@InputType()
export class FirstLevelInput {
  @Field()
  @IsNotEmpty()
  text: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  secondText?: string;

  @Field(() => [SecondLevelInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SecondLevelInput)
  secondLevel?: SecondLevelInput[];
}

@InputType()
export class SecondLevelInput {
  @Field()
  @IsNotEmpty()
  text: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  secondText?: string;
}
