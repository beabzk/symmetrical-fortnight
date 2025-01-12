/* eslint-disable prettier/prettier */

import { Injectable, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookCreateDto } from './dto';

@Injectable()
export class BookService {
    constructor(private prisma: PrismaService) { }

    async createBook(data: BookCreateDto, userRole: string) {
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

    async getBooks() {
        return this.prisma.book.findMany();
    }

    async updateBook(id: number, data: { title?: string; author?: string; copies?: number }, userRole: string) {
        if (userRole !== 'admin') {
            throw new ForbiddenException('Only admins can update books');
        }
        return this.prisma.book.update({ where: { id }, data });
    }

    async deleteBook(id: number, userRole: string) {
        if (userRole !== 'admin') {
            throw new ForbiddenException('Only admins can delete books');
        }
        return this.prisma.book.delete({ where: { id } });
    }

    async borrowBook(bookId: number, userId: number) {
        return this.prisma.borrowedBook.create({
            data: {
                bookId,
                userId,
            } as Prisma.BorrowedBookUncheckedCreateInput,
        });
    }

    async returnBook(borrowId: number) {
        return this.prisma.borrowedBook.update({
            where: { id: borrowId },
            data: { publishedDate: 'returned' },
        });
    }
}

