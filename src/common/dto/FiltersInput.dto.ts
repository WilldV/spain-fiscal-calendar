import { ArgsType, Field } from '@nestjs/graphql';
import { Matches } from 'class-validator';

@ArgsType()
export class FiltersInput {
  @Field({ nullable: true })
  @Matches(/^([a-zA-Z]+={1}[=></~!%$]{1}.+&?)*$/, {
    message: 'Filter is not formed correctly',
  })
  filter: string;
}
