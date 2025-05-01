// src/users/users.controller.ts
import { Controller, Post, Get, Body, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Logger } from '@nestjs/common';




@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        
    ) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        
        return this.usersService.create(createUserDto); 
    }

    @Get()
    async getAllUsers() {
        return this.usersService.findAll();
    }
}