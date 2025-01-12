/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';


@Module({
    imports: [PrismaModule,
        PassportModule.register({ defaultStrategy: 'jwt' }), // Register 'jwt' as the default strategy
        JwtModule.register({
            secret: 'secret', // Replace with your actual secret key
            signOptions: { expiresIn: '1h' }, // Token expiration
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtService, JwtStrategy]
})
export class AuthModule { }
