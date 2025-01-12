/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { BookService } from './book.service';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { BookCreateDto } from './dto/BookCreateDto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtAuthGuard) // Guard applied to all routes in this controller
@Controller('books')
export class BookController {
    constructor(private bookService: BookService) { }

    @Post()
    createBook(@Body() data: BookCreateDto, @Req() req) {
        console.log("inside")
        console.log("user", req.user.userRole);
        return this.bookService.createBook(data, req.user.userRole);
    }

    @Get()
    getBooks() {
        return this.bookService.getBooks();
    }

    @Roles('admin')
    @UseGuards(RolesGuard) // Additional guard for roles
    @Patch(':id')
    updateBook(@Param('id') id: number, @Body() data, @Req() req) {
        return this.bookService.updateBook(+id, data, req.user.userRole);
    }

    @Roles('admin')
    @UseGuards(RolesGuard) // Additional guard for roles
    @Delete(':id')
    deleteBook(@Param('id') id: number, @Req() req) {
        return this.bookService.deleteBook(+id, req.user.userRole);
    }

    @Post(':id/borrow')
    borrowBook(@Param('id') bookId: number, @Req() req) {
        return this.bookService.borrowBook(+bookId, req.user.id);
    }

    @Post(':id/return')
    returnBook(@Param('id') borrowId: number) {
        return this.bookService.returnBook(+borrowId);
    }
}
