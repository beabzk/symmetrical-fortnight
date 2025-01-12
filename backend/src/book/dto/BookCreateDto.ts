/* eslint-disable prettier/prettier */

export class BookCreateDto {
    title: string;
    author: string;
    publishedDate: Date;
    genre: string;
    isAvailable?: boolean;
}
