import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Workspaces extends Document {
  @Prop({ required: true })
  name: string;
}

export const WorkspacesSchema = SchemaFactory.createForClass(Workspaces);