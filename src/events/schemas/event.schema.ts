import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from '../../common';

@ObjectType()
export class EventContent {
  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  secondText?: string;

  @Field(() => [FirstLevel])
  firstLevel: FirstLevel[];
}

@ObjectType()
export class FirstLevel {
  @Field()
  text: string;

  @Field({ nullable: true })
  secondText?: string;

  @Field(() => [SecondLevel])
  secondLevel?: SecondLevel[];
}

@ObjectType()
export class SecondLevel {
  @Field()
  text: string;

  @Field({ nullable: true })
  secondText?: string;
}

export type EventDocument = Event & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Event extends BaseSchema {
  @Field({ nullable: true })
  @Prop({ type: Date })
  startDate?: Date;

  @Field()
  @Prop({ type: Date, required: true })
  endDate: Date;

  @Field()
  @Prop({ type: String, required: true })
  title: string;

  @Field(() => [EventContent])
  @Prop(
    raw([
      {
        text: { type: String },
        secondText: { type: String },
        firstLevel: [
          {
            text: { type: String, required: true },
            secondText: { type: String },
            secondLevel: [
              {
                text: { type: String, required: true },
                secondText: { type: String },
              },
            ],
          },
        ],
      },
    ]),
  )
  content: EventContent[];

  @Field(() => [String])
  @Prop({ type: [String] })
  tags?: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
