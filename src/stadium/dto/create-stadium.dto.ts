import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStadiumDto {
  @IsNumber()
  category_id: number;

  @IsNumber()
  owner_id: number;

  @IsString()
  @IsNotEmpty()
  contact_with: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  volume: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  region_id: number;

  @IsNumber()
  district_id: number;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsDate()
  build_at: Date;

  start_time: string;
  end_time: string;
}
