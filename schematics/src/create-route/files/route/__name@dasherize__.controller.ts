import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/base.controller';
import { <%= classify(model) %> } from 'src/common/schemas/<%= dasherize(model) %>.schema';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

interface DTO {
  createDto: CreateDto;
  updateDto: UpdateDto;
}

@Controller('<%= dasherize(name) %>')
export class <%= classify(name) %>Controller extends BaseController<<%= classify(model) %>, DTO> {
  constructor(protected readonly <%= dasherize(model) %>Service: <%= classify(name) %>Service) {
    super(<%= dasherize(model) %>Service);
  }
}
