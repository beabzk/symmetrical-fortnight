/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthDto {
    sub?: string;
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    @IsString()
    password: string
    name?: string
    hash?: string
    @IsString()
    userRole?: string

}