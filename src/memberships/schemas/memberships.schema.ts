import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from '../../common/enums/role.enum';

@Schema()
export class Membership extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId; // L'utilisateur concerné

  @Prop({ type: Types.ObjectId, ref: 'Workspace', required: true })
  workspace: Types.ObjectId; // L'espace de travail concerné

  @Prop({ enum: Role, required: true })
  role: Role; // Le rôle de l'utilisateur dans cet espace (creator ou collaborator)
}

export const MembershipSchema = SchemaFactory.createForClass(Membership);