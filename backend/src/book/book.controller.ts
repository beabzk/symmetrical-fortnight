import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookCreateDto, BookUpdateDto } from './dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @Roles('admin')
  create(@Body() createBookDto: BookCreateDto, @Req() req) {
    return this.bookService.createBook(createBookDto, req.user.userRole);
  }

  @Get()
  findAll() {
    return this.bookService.getBooks();
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: BookUpdateDto,
    @Req() req,
  ) {
    return this.bookService.updateBook(+id, updateBookDto, req.user.userRole);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string, @Req() req) {
    return this.bookService.deleteBook(+id, req.user.userRole);
  }

  @Post(':id/borrow')
  borrowBook(@Param('id') bookId: string, @Req() req) {
    return this.bookService.borrowBook(+bookId, req.user.userId);
  }

  @Post(':id/return')
  returnBook(@Param('id') borrowId: string) {
    return this.bookService.returnBook(+borrowId);
  }
}
