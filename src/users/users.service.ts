import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

import { Workspaces } from '../workspaces/schemas/workspace.schema';
import { WorkspacesService } from '../workspaces/workspaces.service';
import { MembershipsService } from '../memberships/memberships.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Workspaces.name) private workspaceModel: Model<Workspaces>,
        private readonly workspacesService: WorkspacesService,
        private readonly membershipsService: MembershipsService,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
        if (existingUser) {
            throw new Error('User already exists');
        }

        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltRound);

        const newUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
        });
        
        const savedUser = await newUser.save();
        const newWorkspace = new this.workspaceModel({
            name: createUserDto.name,
            owner: savedUser._id,
        });

        const workspace = await this.workspacesService.create({
            name: `${createUserDto.name}'s Workspace`,
        })

        await this.membershipsService.create({
            user: savedUser._id,
            workspace: workspace._id,
            role: 'creator',
        });
        
        return newUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User | null> {
        if (!id) {
            return null;
        }
        return this.userModel.findById(id).exec();
    }

    findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }
}