import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // First, validate JWT token using passport
    const jwtValid = await super.canActivate(context);
    if (!jwtValid) {
      return false;
    }

    // Get required roles from decorator
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles specified, allow any authenticated user
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Check if user's role is in the required roles
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return requiredRoles.includes(user.role);
  }
}
