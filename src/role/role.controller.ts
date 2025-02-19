import { Controller, UseGuards } from '@nestjs/common';
import { BaseController } from 'src/common/base/base.controller';
import { Role } from 'src/common/schemas/role.schema';
import { RoleService } from './role.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/common/guards/permissions/permissions.guard';

import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

interface DTO {
  createDto: CreateDto;
  updateDto: UpdateDto;
}
@Controller('role')
export class RoleController extends BaseController<Role, DTO> {
  constructor(protected readonly roleService: RoleService) {
    super(roleService);
  }
}
