import { ApiProperty } from "@nestjs/swagger";

export class DeactivateAdminDto {
  @ApiProperty({
    example: 1,
    description: "The ID of the admin to deactivate",
  })
  readonly adminId: number;
}
