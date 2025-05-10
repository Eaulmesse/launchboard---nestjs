import { IsString, IsNotEmpty} from 'class-validator';

export class CreateMembershipDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}