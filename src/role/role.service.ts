import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from 'src/common/schemas/role.schema';
import { Model } from 'mongoose';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(@InjectModel('Role') private roleModel: Model<Role>) {
    super(roleModel);
  }
}
