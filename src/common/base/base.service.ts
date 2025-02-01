import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';

@Injectable()
export abstract class BaseService<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(createDto: any): Promise<T> {
    const createdEntity = new this.model(createDto);
    return createdEntity.save();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findById(id: string): Promise<T> {
    return this.model.findOne({ _id: id }).exec();
  }

  async update(id: string, updateDto: any): Promise<T> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async delete(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
