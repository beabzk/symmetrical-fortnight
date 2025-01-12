/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret', // Ensure this matches your .env or config
        });
    }

    validate(payload: any) {
        console.log('JwtStrategy: Validating payload:', payload);
        return { userId: payload.sub, userRole: payload.role }; // Attach this to req.user
    }
}
