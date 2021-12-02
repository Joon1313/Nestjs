import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
