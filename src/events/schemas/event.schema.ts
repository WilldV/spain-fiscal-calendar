import { BaseSchema } from '@common/classes/BaseSchema';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class EventContent {
  text?: string;

  secondText?: string;

  firstLevel: FirstLevel;
}

export class FirstLevel {
  text: string;

  secondText?: string;

  secondLevel?: SecondLevel;
}

export class SecondLevel {
  text: string;

  secondText?: string;
}

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event extends BaseSchema {
  @Prop({ type: Date })
  startDate?: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ type: String, required: true })
  title: string;

  @Prop(
    raw({
      text: { type: String },
      secondText: { type: String },
      firstLevel: {
        text: { type: String, required: true },
        secondText: { type: String },
        secondLevel: {
          text: { type: String, required: true },
          secondText: { type: String },
        },
      },
    }),
  )
  content: EventContent;

  @Prop({ type: [String] })
  tags?: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
