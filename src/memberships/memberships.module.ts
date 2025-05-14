import { Module } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { MembershipsController } from './memberships.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Membership, MembershipSchema } from './schemas/memberships.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Membership.name, schema: MembershipSchema },
      { name: 'User', schema: MembershipSchema },
      { name: 'Workspace', schema: MembershipSchema },
    ]),
    JwtModule.register({
      secret: `${process.env.TOKEN_SECRET}` ,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [MembershipsService],
  controllers: [MembershipsController],
  exports: [MembershipsService],
})
export class MembershipsModule {}
