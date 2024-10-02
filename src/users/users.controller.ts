import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserGuard } from "../guards/user.guard";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

 
  @Get("activate/:link")
  async activateUser(@Param("link") link: string) {
    return this.usersService.activateUser(link);
  }


  @UseGuards(UserGuard)
  @Get("get")
  findAll() {
    return this.usersService.findAll();
  }

  @Get("get/:id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch("update/:id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
