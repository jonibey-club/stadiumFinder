import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { DistrictService } from "./district.service";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";

@Controller("district")
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Post("create")
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @Get("get")
  findAll() {
    return this.districtService.findAll();
  }

  @Get("get/:id")
  findOne(@Param("id") id: string) {
    return this.districtService.findOne(+id);
  }

  @Patch("update/:id")
  update(
    @Param("id") id: string,
    @Body() updateDistrictDto: UpdateDistrictDto
  ) {
    return this.districtService.update(+id, updateDistrictDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.districtService.remove(+id);
  }
}
