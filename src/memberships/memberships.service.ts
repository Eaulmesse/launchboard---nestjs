import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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

    async findAll(): Promise<Memberships[]> {
        return this.membershipsModel.find().exec();
    }
}
