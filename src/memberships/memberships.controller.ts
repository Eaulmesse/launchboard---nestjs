import { Controller, Post, Get, Body, Param } from '@nestjs/common';
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

    // @Post('add-user/:membershipId/:userId')
    // async addUserToWorkspace(
    //     @Param('membershipId') membershipId: string,
    //     @Param('userId') userId: string, // Extraire userId depuis l'URL
    // ) {
    //     return this.membershipsService.addUserToWorkspace(membershipId, userId);
    // }

    @Get()
    async getAllMemberships() {
        return this.membershipsService.findAll();
    }
}
