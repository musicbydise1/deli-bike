import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../modules/users/users.service';
import { errorMessages } from '../constants/error-messages';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<number[]>('roleIds', context.getHandler());
    if (roles.length === 0) return true;
    const request = context.switchToHttp().getRequest();
    if (!request.user.roles.some((userRole) => roles.includes(userRole.id)))
      throw new UnauthorizedException(errorMessages.auth.notAllowed);

    return true;
  }
}
