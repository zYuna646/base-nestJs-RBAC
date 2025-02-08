import { Module } from '@nestjs/common';
import { <%= classify(name) %>Controller } from './<%= dasherize(name) %>.controller';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';
import { MongooseModule } from '@nestjs/mongoose';
import { <%= classify(model) %>Schema } from 'src/common/schemas/<%= dasherize(model) %>.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: '<%= classify(model) %>', schema: <%= classify(model) %>Schema }])],
  controllers: [<%= classify(name) %>Controller],
  providers: [<%= classify(name) %>Service],
})
export class <%= classify(name) %>Module {}
