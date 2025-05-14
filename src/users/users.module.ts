import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { Workspaces, WorkspacesSchema } from '../workspaces/schemas/workspace.schema';
import { WorkspacesModule } from 'src/workspaces/workspaces.module';
import { MembershipsModule } from 'src/memberships/memberships.module';
import { Membership, MembershipSchema } from 'src/memberships/schemas/memberships.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Workspaces.name, schema: WorkspacesSchema },
    ]),
    JwtModule.register({
      secret: `${process.env.TOKEN_SECRET}` ,
      signOptions: { expiresIn: '1h' },
  }),
    WorkspacesModule,
    MembershipsModule,
  ],
  
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], 
})

export class UsersModule {}