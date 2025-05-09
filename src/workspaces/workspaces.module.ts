import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Workspaces, WorkspacesSchema } from './schemas/workspace.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Workspaces.name, schema: WorkspacesSchema }]),
  ],
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
  exports: [WorkspacesService], 
})
export class WorkspacesModule {}
