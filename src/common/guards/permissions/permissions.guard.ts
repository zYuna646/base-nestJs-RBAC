import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );
    if (!requiredPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    console.log(request);

    const user: any = await this.userService.findById(request.user.userId);

    const resource = context
      .getClass()
      .name.replace('Controller', '')
      .toUpperCase();
    const permission = `${requiredPermission} ${resource}`;

    return user?.role?.permissions?.includes(permission);
  }
}
