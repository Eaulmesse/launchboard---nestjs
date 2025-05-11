import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { InjectModel,  } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Memberships } from './schemas/memberships.schema';

@Injectable()
export class MembershipsService {
    constructor(
        @InjectModel(Memberships.name) private membershipsModel: Model<Memberships>
    ) {}

    async create(createMembershipDto: any): Promise<Memberships> {
        const newMembership = new this.membershipsModel(createMembershipDto);
        return newMembership.save();
    }

    async addUserToWorkspace(membershipId: string, userId: string): Promise<Memberships> {
        const membership = await this.membershipsModel.findById(membershipId);
        if (!membership) {
            throw new Error('Membership not found');
        }
        membership.users.push(new Types.ObjectId(userId));
        return membership.save();
    }

    async findAll(): Promise<Memberships[]> {
        return this.membershipsModel.find().exec();
    }
}
