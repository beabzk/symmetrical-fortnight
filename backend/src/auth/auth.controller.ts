/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { Public } from "./decorator/public.decorator";

@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService) { }
    @Public()
    @Post('signup')
    signup(@Body() dto: AuthDto) {
        console.log({
            dto,
        })
        return this.authservice.signup(dto);
    }
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authservice.signin(dto);
    }
}