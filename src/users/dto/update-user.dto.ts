import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
