import { IsEnum, IsMongoId } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class CreateMembershipDto {
  @IsMongoId()
  user: string;

  @IsMongoId()
  workspace: string;

  @IsEnum(Role)
  role: Role;
}