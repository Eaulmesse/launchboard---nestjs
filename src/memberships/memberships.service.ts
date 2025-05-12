import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { InjectModel,  } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Membership } from './schemas/memberships.schema';

@Injectable()
export class MembershipsService {
    constructor(
        @InjectModel(Membership.name) private membershipsModel: Model<Membership>
    ) {}

    async create(createMembershipDto: any): Promise<Membership> {
        const existingMembership = await this.membershipsModel.findOne({
            user: createMembershipDto.user,
            workspace: createMembershipDto.workspace,
        }).exec();
        if (existingMembership) {
            throw new Error('Membership already exists');
        }

        if (createMembershipDto.role === 'creator') {
            const existingCreator = await this.membershipsModel.findOne({
                workspace: createMembershipDto.workspace,
                role: 'creator',
            }).exec();

            if (existingCreator) {
                throw new Error('This workspace already has a creator');
            }
        }

        const newMembership = new this.membershipsModel(createMembershipDto);
        return newMembership.save();
    }

    async findAll(): Promise<Membership[]> {
        return this.membershipsModel.find().exec();
    }
}
