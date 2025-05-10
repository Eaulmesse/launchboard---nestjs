import { Module } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { MembershipsController } from './memberships.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Memberships, MembershipsSchema } from './schemas/memberships.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Memberships.name, schema: MembershipsSchema },
      { name: 'User', schema: MembershipsSchema },
      { name: 'Workspace', schema: MembershipsSchema },
    ]),
  ],
  providers: [MembershipsService],
  controllers: [MembershipsController],
  exports: [MembershipsService],
})
export class MembershipsModule {}
