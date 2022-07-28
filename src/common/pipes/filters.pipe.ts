import { PipeTransform, Injectable } from '@nestjs/common';
import { FiltersInput } from '../dto';
import { FilterOperation } from '../enums';

@Injectable()
export class ParseFiltersPipe
  implements PipeTransform<FiltersInput, Record<string, any>>
{
  transform({ filter }: FiltersInput): Record<string, any> {
    const stringFilter = filter;

    let finalFilter = {};

    if (stringFilter) {
      const pairs = stringFilter.split('&');

      pairs.map((p) => {
        const [field, valueAndSymbol] = p.split('=');
        const symbol = valueAndSymbol[0];
        const value = valueAndSymbol.substring(1);

        if (symbol == FilterOperation.EQUAL) {
          const condition = { $eq: value };

          this.evaluateField(finalFilter, field, condition);
        } else if (symbol == FilterOperation.DIFFERENT) {
          const condition = { $ne: value };

          this.evaluateField(finalFilter, field, condition);
        } else if (symbol == FilterOperation.GREATER) {
          const condition = { $gt: value };

          this.evaluateField(finalFilter, field, condition);
        } else if (symbol == FilterOperation.GREATER_EQUAL) {
          const condition = { $gte: value };

          this.evaluateField(finalFilter, field, condition);
        } else if (symbol == FilterOperation.LESS) {
          const condition = { $lt: value };

          this.evaluateField(finalFilter, field, condition);
        } else if (symbol == FilterOperation.LESS_EQUAL) {
          const condition = { $lte: value };

          this.evaluateField(finalFilter, field, condition);
        } else if (symbol == FilterOperation.LIKE) {
          const condition = { $regex: value, $options: 'i' };

          this.evaluateField(finalFilter, field, condition);
        } else if (symbol == FilterOperation.NOT_LIKE) {
          const condition = { $not: { $regex: value, $options: 'i' } };

          this.evaluateField(finalFilter, field, condition);
        }
      });
    }

    return finalFilter;
  }

  evaluateField(
    filter: Record<string, any>,
    field: string,
    condition: Record<string, any>,
  ) {
    if (filter[field]) {
      filter[field] = {
        ...filter[field],
        ...condition,
      };
    } else {
      filter[field] = condition;
    }
  }
}
