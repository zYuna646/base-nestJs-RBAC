import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );
    if (!requiredPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const permissions = request.user.role.permissions;
    if (permissions.includes('*')) {
      return true;
    }

    const resource = context
      .getClass()
      .name.replace('Controller', '')
      .toUpperCase();
    const permission = `${requiredPermission} ${resource}`;

    return permissions.includes(permission);
  }
}
