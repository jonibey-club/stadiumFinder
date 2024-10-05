import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMediaDto {
  @IsNumber()
  stadium_id: number;

  @IsNotEmpty()
  photo: string;

  @IsString()
  @IsNotEmpty()
  desription: string;
}
