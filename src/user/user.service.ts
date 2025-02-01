import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';
import { User } from 'src/common/schemas/user.schema';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectModel('User') private userModel: Model<User>) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<User> {
    return this.model.findOne({ email: email }).exec();
  }
}
