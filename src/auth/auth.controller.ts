import { Controller, Post, Get, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('login')
        async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.signIn(loginDto.email, loginDto.password, res);
    }

    // @Post('logout')
    // async logout(@Body() userId: string) {
    //     return this.authService.logout(userId); 
    // }

    // @Get('profile')
    // async getProfile(@Body() userId: string) {
    //     return this.authService.getProfile(userId); 
    // }
}
