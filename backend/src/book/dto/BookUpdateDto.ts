/* eslint-disable prettier/prettier */

export class BookUpdateDto {
    title?: string;
    author?: string;
    publishedDate?: Date;
    genre?: string;
    pageCount?: number;
    // Other optional fields for partial updates
}
