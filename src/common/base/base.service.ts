import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { HttpStatus } from '@nestjs/common';
import { BaseResponse } from './base.response';

@Injectable()
export abstract class BaseService<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(createDto: any): Promise<BaseResponse<T>> {
    try {
      const createdEntity = new this.model(createDto);
      const savedEntity = await createdEntity.save();
      return new BaseResponse<T>(
        HttpStatus.CREATED,
        'Entity created successfully',
        savedEntity,
      );
    } catch (error) {
      return new BaseResponse<T>(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error creating entity',
        null,
        error.message,
      );
    }
  }

  async findAll(): Promise<BaseResponse<T[]>> {
    try {
      const entities = await this.model.find().exec();
      return new BaseResponse<T[]>(
        HttpStatus.OK,
        'Entities fetched successfully',
        entities,
      );
    } catch (error) {
      return new BaseResponse<T[]>(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error fetching entities',
        null,
        error.message,
      );
    }
  }

  async findById(id: string): Promise<BaseResponse<T>> {
    try {
      const entity = await this.model.findOne({ _id: id }).exec();
      if (!entity) {
        return new BaseResponse<T>(
          HttpStatus.NOT_FOUND,
          'Entity not found',
          null,
        );
      }
      return new BaseResponse<T>(
        HttpStatus.OK,
        'Entity fetched successfully',
        entity,
      );
    } catch (error) {
      return new BaseResponse<T>(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error fetching entity',
        null,
        error.message,
      );
    }
  }

  async update(id: string, updateDto: any): Promise<BaseResponse<T>> {
    try {
      const updatedEntity = await this.model
        .findByIdAndUpdate(id, updateDto, { new: true })
        .exec();
      if (!updatedEntity) {
        return new BaseResponse<T>(
          HttpStatus.NOT_FOUND,
          'Entity not found to update',
          null,
        );
      }
      return new BaseResponse<T>(
        HttpStatus.OK,
        'Entity updated successfully',
        updatedEntity,
      );
    } catch (error) {
      return new BaseResponse<T>(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error updating entity',
        null,
        error.message,
      );
    }
  }

  async delete(id: string): Promise<BaseResponse<T>> {
    try {
      const deletedEntity = await this.model.findByIdAndDelete(id).exec();
      if (!deletedEntity) {
        return new BaseResponse<T>(
          HttpStatus.NOT_FOUND,
          'Entity not found to delete',
          null,
        );
      }
      return new BaseResponse<T>(
        HttpStatus.OK,
        'Entity deleted successfully',
        deletedEntity,
      );
    } catch (error) {
      return new BaseResponse<T>(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Error deleting entity',
        null,
        error.message,
      );
    }
  }
}
