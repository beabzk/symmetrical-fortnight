/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('userRole', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        console.log('Request User:', user); // Debugging log
        if (!user) {
            console.error('User is not defined on the request.');
            return false;
        }

        const userRole = user.userRole || user.role; // Fallback to `user.role` if `userRole` is not present
        console.log('User Role:', userRole);

        return roles.includes(userRole);
    }

}
