
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignInUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;
}
