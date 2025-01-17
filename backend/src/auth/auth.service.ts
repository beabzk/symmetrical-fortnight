/* eslint-disable prettier/prettier */
import {
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) { }

    async signup(dto: AuthDto) {
        // generate the password hash
        const hash = await argon.hash(dto.password);
        // save the new user in the db
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hash,
                    name: dto.name,
                    password: dto.password,
                    userRole: dto.userRole
                },
            });

            return this.signToken(user.id, user.email, user.userRole);
        } catch (error) {
            if (
                error instanceof
                Prisma.PrismaClientKnownRequestError
            ) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Credentials taken',
                    );
                }
            }
            throw error;
        }
    }

    async signin(dto: AuthDto) {

        const user =
            await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            });

        if (!user)
            throw new ForbiddenException(
                'Credentials incorrect',
            );


        const pwMatches = await argon.verify(
            user.hash,
            dto.password,
        );

        if (!pwMatches)
            throw new ForbiddenException(
                'Credentials incorrect',
            );
        return this.signToken(user.id, user.email, user.userRole);
    }

    async signToken(
        userId: number,
        email: string,
        role: string,
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
            role,
        };

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '1h',
                secret: "secret",
            },
        );

        return {
            access_token: token,
        };
    }
}