import { Model } from 'mongoose';

export abstract class BaseService<T> {
  constructor(protected model: Model<T>) {}

  async findById(id: string | number) {
    return this.model.findById(id);
  }

  async findOne(query: Partial<T>) {
    return this.model.findOne(query);
  }

  async find(query: Partial<T>) {
    return this.model.find(query);
  }

  async create(payload: Partial<T>) {
    return this.model.create(payload);
  }

  async updateById(id: string | number, payload: Partial<T>) {
    return this.model.findByIdAndUpdate(id, payload);
  }

  async deleteById(id: string | number) {
    return this.model.findByIdAndDelete(id);
  }
}
