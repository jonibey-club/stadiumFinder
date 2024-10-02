import { ApiProperty } from "@nestjs/swagger";

export class ActivateAdminDto {
  @ApiProperty({
    example: 1,
    description: "ID of the admin to activate",
  })
  readonly adminId: number;
}
