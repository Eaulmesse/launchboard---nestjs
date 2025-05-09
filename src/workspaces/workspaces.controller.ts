import { Controller, Post, Get, Body } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';

@Controller('workspaces')
export class WorkspacesController {
    constructor(
       private readonly workspacesService: WorkspacesService,
    ) {}

    @Post()
    async createWorkspace(@Body() createWorkspaceDto: any) {
        return this.workspacesService.create(createWorkspaceDto);
    }

    @Get()
    async getAllWorkspaces() {
        return this.workspacesService.findAll();
    }
}
