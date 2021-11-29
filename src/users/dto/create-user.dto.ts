import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  user_id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(12)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  age: number;
}
