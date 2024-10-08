import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class NewTokenDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
