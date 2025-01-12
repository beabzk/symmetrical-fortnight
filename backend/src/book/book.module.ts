/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
@Module({
    imports: [
        JwtModule.register({
            secret: 'secret', // Use the same key as in token generation
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [BookService, PrismaService, JwtStrategy],
    controllers: [BookController],
})
export class BookModule { }
