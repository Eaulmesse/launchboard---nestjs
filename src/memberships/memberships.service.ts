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
        const newMembership = new this.membershipsModel(createMembershipDto);
        return newMembership.save();
    }

    async findAll(): Promise<Membership[]> {
        return this.membershipsModel.find().exec();
    }
}
