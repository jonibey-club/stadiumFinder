import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { StadiumTimesService } from "./stadium-times.service";
import { CreateStadiumTimeDto } from "./dto/create-stadium-time.dto";
import { UpdateStadiumTimeDto } from "./dto/update-stadium-time.dto";

@Controller("stadium-times")
export class StadiumTimesController {
  constructor(private readonly stadiumTimesService: StadiumTimesService) {}

  @Post("create")
  create(@Body() createStadiumTimeDto: CreateStadiumTimeDto) {
    return this.stadiumTimesService.create(createStadiumTimeDto);
  }

  @Get("get")
  findAll() {
    return this.stadiumTimesService.findAll();
  }

  @Get("get:id")
  findOne(@Param("id") id: string) {
    return this.stadiumTimesService.findOne(+id);
  }

  @Patch("update/:id")
  update(
    @Param("id") id: string,
    @Body() updateStadiumTimeDto: UpdateStadiumTimeDto
  ) {
    return this.stadiumTimesService.update(+id, updateStadiumTimeDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.stadiumTimesService.remove(+id);
  }
}
