import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto {
  @ApiProperty({
    example: "Admin",
    description: "Admin's name",
  })
  name: string;

  @ApiProperty({
    example: "admin@example.com",
    description: "Admin's email",
  })
  login: string;

  @ApiProperty({
    example: "link",
    description: "Admin's tg_link",
  })
  telegram_link: string;

  @ApiProperty({
    example: "adminphoto",
    description: "Admin's photo",
  })
  admin_photo: string;

  @ApiProperty({
    example: "adminpassword",
    description: "Admin's password",
  })
  hashed_password: string;

  @ApiProperty({
    example: true,
    description: "Admin's status (active/inactive)",
  })
  is_active: boolean;

  @ApiProperty({
    example: true,
    description: "Admin's role (creator/non-creator)",
  })
  is_creator: boolean;

  hashed_refresh_token?: string;
}
