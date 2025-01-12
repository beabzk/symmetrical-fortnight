import { Injectable, ForbiddenException } from '@nestjs/common';
import { Prisma, Book } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { BookCreateDto, BookUpdateDto } from './dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async createBook(data: BookCreateDto, userRole: string): Promise<Book> {
    if (userRole !== 'admin') {
      throw new ForbiddenException('Only admins can create books');
    }
    return this.prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        genre: data.genre,
        publishedDate: new Date(data.publishedDate),
        isAvailable: data.isAvailable ?? true,
      },
    });
  }

  async getBooks(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  async updateBook(
    id: number,
    data: BookUpdateDto,
    userRole: string,
  ): Promise<Book> {
    if (userRole !== 'admin') {
      throw new ForbiddenException('Only admins can update books');
    }
    return this.prisma.book.update({ where: { id }, data });
  }

  async deleteBook(id: number, userRole: string): Promise<Book> {
    if (userRole !== 'admin') {
      throw new ForbiddenException('Only admins can delete books');
    }
    return this.prisma.book.delete({ where: { id } });
  }

  async borrowBook(bookId: number, userId: number): Promise<any> {
    // Implementation depends on your logic for borrowing
  }

  async returnBook(borrowId: number): Promise<any> {
    // Implementation depends on your logic for returning
  }
}
