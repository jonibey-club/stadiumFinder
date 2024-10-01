import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber("UZ")
  phone: string;

  @IsString()
  @IsOptional()
  tg_link: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
  confirm_password: string;

  @IsString()
  @IsOptional()
  photo: string;
}
