import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ComfortStadiumService } from "./comfort-stadium.service";
import { CreateComfortStadiumDto } from "./dto/create-comfort-stadium.dto";
import { UpdateComfortStadiumDto } from "./dto/update-comfort-stadium.dto";

@Controller("comfort-stadium")
export class ComfortStadiumController {
  constructor(private readonly comfortStadiumService: ComfortStadiumService) {}

  @Post("create")
  create(@Body() createComfortStadiumDto: CreateComfortStadiumDto) {
    return this.comfortStadiumService.create(createComfortStadiumDto);
  }

  @Get("get")
  findAll() {
    return this.comfortStadiumService.findAll();
  }

  @Get("get/:id")
  findOne(@Param("id") id: string) {
    return this.comfortStadiumService.findOne(+id);
  }

  @Patch("update/:id")
  update(
    @Param("id") id: string,
    @Body() updateComfortStadiumDto: UpdateComfortStadiumDto
  ) {
    return this.comfortStadiumService.update(+id, updateComfortStadiumDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.comfortStadiumService.remove(+id);
  }
}
