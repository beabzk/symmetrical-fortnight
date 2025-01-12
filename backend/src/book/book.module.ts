import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Assuming you have a PrismaModule

@Module({
  imports: [PrismaModule],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
