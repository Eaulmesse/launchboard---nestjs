import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspaces } from './schemas/workspace.schema';
import { MembershipsService } from 'src/memberships/memberships.service';

@Injectable()
export class WorkspacesService {
    constructor(
        @InjectModel(Workspaces.name) private workspaceModel: Model<Workspaces>,
    ) {}

    async create(createWorkspaceDto: any): Promise<Workspaces> {
        const newWorkspace = new this.workspaceModel(createWorkspaceDto);
        return newWorkspace.save();
    }

    async findByUserId(userId: string): Promise<Workspaces[]> {
        return this.workspaceModel.find({ owner: userId }).exec();
    }

    async findAll(): Promise<Workspaces[]> {
        return this.workspaceModel.find().exec();
    }
}