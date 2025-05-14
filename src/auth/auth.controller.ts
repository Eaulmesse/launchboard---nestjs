import { Controller, Post, Get, Body, Res } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('login')
        async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.signIn(loginDto.email, loginDto.password, res);
    }

    @Post('logout')
        async logout(@Res({ passthrough: true }) res: Response) {
        return this.authService.logout(res);
    }

    // @Get('profile')
    // async getProfile(@Body() userId: string) {
    //     return this.authService.getProfile(userId); 
    // }
}
