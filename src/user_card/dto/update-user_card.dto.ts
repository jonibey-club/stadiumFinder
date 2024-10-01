import { PartialType } from "@nestjs/swagger";
import { CreateUserCardDto } from "./create-user_card.dto";

export class UpdateUserCardDto extends PartialType(CreateUserCardDto) {
  user_id?: number;
  name?: string;
  phone?: string;
  number?: number;
  year?: number;
  month?: number;
  is_active?: boolean;
  is_main?: boolean;
}
