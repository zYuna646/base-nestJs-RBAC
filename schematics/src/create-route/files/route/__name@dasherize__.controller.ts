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
import { BaseController } from 'src/common/base/base.controller';  // Assuming BaseController provides basic CRUD functionality
import { <%= classify(model) %> } from 'src/common/schemas/<%= dasherize(model) %>.schema';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/common/guards/permissions/permissions.guard';
import { CreateDto<%= classify(model) %> } from './dto/create.dto';
import { UpdateDto<%= classify(model) %> } from './dto/update.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Permission } from 'src/common/decorators/permissions.decorator';
import { BaseResponse } from 'src/common/base/base.response';

@Controller('<%= dasherize(name) %>')
@ApiBearerAuth()
export class <%= classify(name) %>Controller extends BaseController<<%= classify(model) %>> {
  constructor(protected readonly <%= dasherize(name) %>Service: <%= classify(name) %>Service) {
    super(<%= dasherize(name) %>Service); 
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new <%= dasherize(name) %>' })
  @ApiBody({ type: CreateDto<%= classify(model) %> })
  @ApiResponse({
    status: 201,
    description: 'The <%= dasherize(name) %> has been successfully created.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: BaseResponse,
  })
  @Permission('POST')
  async create(@Body() createDto: CreateDto<%= classify(model) %>): Promise<BaseResponse<<%= classify(model) %>>> {
    return this.<%= dasherize(name) %>Service.create(createDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get()
  @ApiOperation({ summary: 'Get all <%= dasherize(name) %>s' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all <%= dasherize(name) %>s.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No <%= dasherize(name) %>s found.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: BaseResponse,
  })
  @Permission('GET')
  async findAll(): Promise<BaseResponse<<%= classify(model) %>[]>> {
    return this.<%= dasherize(name) %>Service.findAll();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a <%= dasherize(name) %> by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the <%= dasherize(name) %>.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No <%= dasherize(name) %> found with the given ID.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: BaseResponse,
  })
  @Permission('GET')
  async findById(@Param('id') id: string): Promise<BaseResponse<<%= classify(model) %>>> {
    return this.<%= dasherize(name) %>Service.findById(id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a <%= dasherize(name) %> by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateDto<%= classify(model) %> })
  @ApiResponse({
    status: 200,
    description: 'The <%= dasherize(name) %> has been successfully updated.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid input data.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No <%= dasherize(name) %> found with the given ID.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: BaseResponse,
  })
  @Permission('PUT')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto<%= classify(model) %>,
  ): Promise<BaseResponse<<%= classify(model) %>>> {
    return this.<%= dasherize(name) %>Service.update(id, updateDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a <%= dasherize(name) %> by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'The <%= dasherize(name) %> has been successfully deleted.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No <%= dasherize(name) %> found with the given ID.',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    type: BaseResponse,
  })
  @Permission('DELETE')
  async softDelete(@Param('id') id: string): Promise<BaseResponse<<%= classify(model) %>>> {
    return this.<%= dasherize(name) %>Service.delete(id);
  }
}
