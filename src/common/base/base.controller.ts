import { Controller } from '@nestjs/common';
import { Document } from 'mongoose';
import { BaseService } from './base.service';

@Controller()
export abstract class BaseController<T extends Document> {
  constructor(protected readonly baseService: BaseService<T>) {}

  abstract create(createDto: any): Promise<T>;

  abstract findAll(): Promise<T[]>;

  abstract findById(id: string): Promise<T>;

  abstract update(id: string, updateDto: any): Promise<T>;

  abstract softDelete(id: string): Promise<T>;
}
