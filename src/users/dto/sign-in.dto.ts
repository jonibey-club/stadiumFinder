import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignInUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
