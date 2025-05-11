import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { Role } from '../../common/enums/role.enum';

@Schema()
export class Memberships extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', default: [] })
  users: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Workspace', required: true })
  workspace: Types.ObjectId;

  @Prop({ enum: Role, required: true })
  role: Role;

}

export const MembershipsSchema = SchemaFactory.createForClass(Memberships);