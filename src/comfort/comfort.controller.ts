import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ComfortService } from "./comfort.service";
import { CreateComfortDto } from "./dto/create-comfort.dto";
import { UpdateComfortDto } from "./dto/update-comfort.dto";

@Controller("comfort")
export class ComfortController {
  constructor(private readonly comfortService: ComfortService) {}

  @Post("create")
  create(@Body() createComfortDto: CreateComfortDto) {
    return this.comfortService.create(createComfortDto);
  }

  @Get("get")
  findAll() {
    return this.comfortService.findAll();
  }

  @Get("get/:id")
  findOne(@Param("id") id: string) {
    return this.comfortService.findOne(+id);
  }

  @Patch("update/:id")
  update(@Param("id") id: string, @Body() updateComfortDto: UpdateComfortDto) {
    return this.comfortService.update(+id, updateComfortDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.comfortService.remove(+id);
  }
}
