import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.signIn(loginDto.email, loginDto.password); 
    }

    @Post('logout')
    async logout(@Body() userId: string) {
        return this.authService.logout(userId); 
    }

    // @Get('profile')
    // async getProfile(@Body() userId: string) {
    //     return this.authService.getProfile(userId); 
    // }
}
