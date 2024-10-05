import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MediaService } from "./media.service";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";

@Controller("media")
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post("create")
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @Get("get")
  findAll() {
    return this.mediaService.findAll();
  }

  @Get("get/:id")
  findOne(@Param("id") id: string) {
    return this.mediaService.findOne(+id);
  }

  @Patch("update/:id")
  update(@Param("id") id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(+id, updateMediaDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.mediaService.remove(+id);
  }
}
