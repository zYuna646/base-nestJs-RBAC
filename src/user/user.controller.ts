import { Controller, UseGuards } from '@nestjs/common';
import { BaseController } from 'src/common/base/base.controller';
import { User } from 'src/common/schemas/user.schema';
import { UserService } from './user.service';
import { PermissionsGuard } from 'src/common/guards/permissions/permissions.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(PermissionsGuard)
@UseGuards(AuthGuard('jwt'))
export class UserController extends BaseController<User> {
  constructor(protected readonly userService: UserService) {
    super(userService);
  }
}
