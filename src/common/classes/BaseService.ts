import { Model } from 'mongoose';

export abstract class BaseService<T> {
  constructor(protected model: Model<T>) {}

  async findById(id: string) {
    return this.model.findById(id);
  }

  async findOne(query: Partial<T>) {
    return this.model.findOne(query);
  }

  async find(query: Partial<T>, limit = 10, offset = 0) {
    return this.model.find(query).skip(offset).limit(limit);
  }

  async findAndCount(query: Partial<T>, limit = 10, offset = 0) {
    const [count, result] = await Promise.all([
      this.model.countDocuments(query),
      this.model.find(query).skip(offset).limit(limit),
    ]);

    return {
      count,
      result,
    };
  }

  async create(payload: Partial<T>) {
    return this.model.create(payload);
  }

  async updateById(id: string, payload: Partial<T>) {
    return this.model.findByIdAndUpdate(id, payload);
  }

  async deleteById(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
