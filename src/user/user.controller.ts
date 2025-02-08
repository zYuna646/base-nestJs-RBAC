import { Controller, UseGuards } from '@nestjs/common';
import { BaseController } from 'src/common/base/base.controller';
import { User } from 'src/common/schemas/user.schema';
import { UserService } from './user.service';
import { PermissionsGuard } from 'src/common/guards/permissions/permissions.guard';
import { AuthGuard } from '@nestjs/passport';

import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

interface DTO {
  createDto: CreateDto;
  updateDto: UpdateDto;
}

@Controller('user')
@UseGuards(PermissionsGuard)
@UseGuards(AuthGuard('jwt'))
export class UserController extends BaseController<User, DTO> {
  constructor(protected readonly userService: UserService) {
    super(userService);
  }
}
