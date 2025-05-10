import { Controller, Post, Get, Body } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { CreateMembershipDto } from './dto/create-membership.dto';

@Controller('memberships')
export class MembershipsController {
    constructor(
        private readonly membershipsService: MembershipsService,
    ) {}

    @Post()
    async createMembership(@Body() createMembershipDto: CreateMembershipDto) {
        return this.membershipsService.create(createMembershipDto);
    }

    @Get()
    async getAllMemberships() {
        return this.membershipsService.findAll();
    }
}
