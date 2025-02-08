import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { <%= classify(model) %> } from 'src/common/schemas/<%= dasherize(model) %>.schema';
import { Model } from 'mongoose';

@Injectable()
export class <%= classify(name) %>Service extends BaseService<<%= classify(model) %>> {
  constructor(
    @InjectModel('<%= classify(model) %>') private <%= dasherize(model) %>Model: Model<<%= classify(model) %>>,
  ) {
    super(<%= dasherize(model) %>Model);
  }
}
