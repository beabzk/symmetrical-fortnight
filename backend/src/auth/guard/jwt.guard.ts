/* eslint-disable prettier/prettier */
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) {
            console.log('JwtAuthGuard: Public route, skipping authentication');
            return true;
        }
        console.log('JwtAuthGuard: Protected route, checking authentication');
        return super.canActivate(context) as boolean | Promise<boolean>;
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            console.error('JwtAuthGuard: Authentication failed:', info?.message || err?.message);
            throw err || new UnauthorizedException('Invalid or missing token');
        }
        console.log('JwtAuthGuard: Authentication successful', user);
        return user;
    }
}
