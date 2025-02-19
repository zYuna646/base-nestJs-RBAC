import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BaseService } from './base.service';
import { Document } from 'mongoose';
import { Permission } from '../decorators/permissions.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../guards/permissions/permissions.guard';

interface BaseDTO {
  createDto: any;
  updateDto: any;
}

@Controller()
export abstract class BaseController<T extends Document, DTO extends BaseDTO> {
  constructor(private readonly baseService: BaseService<T>) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard) // Gabungkan dalam satu dekorator
  @Post()
  @Permission('POST')
  async create(@Body() createDto: DTO['createDto']): Promise<T> {
    return this.baseService.create(createDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard) // Gabungkan dalam satu dekorator
  @Get()
  @Permission('GET')
  async findAll(): Promise<T[]> {
    return this.baseService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard) // Gabungkan dalam satu dekorator
  @Get(':id')
  @Permission('GET')
  async findById(@Param('id') id: string): Promise<T> {
    return this.baseService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard) // Gabungkan dalam satu dekorator
  @Put(':id')
  @Permission('PUT')
  async update(
    @Param('id') id: string,
    @Body() updateDto: DTO['updateDto'],
  ): Promise<T> {
    return this.baseService.update(id, updateDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard) // Gabungkan dalam satu dekorator
  @Permission('DELETE')
  @Delete(':id')
  async softDelete(@Param('id') id: string): Promise<T> {
    return this.baseService.delete(id);
  }
}
