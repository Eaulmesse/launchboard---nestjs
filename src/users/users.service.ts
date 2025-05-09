import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltRound);

        const newUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
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