import { IsNotEmpty } from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  password: string;
}
