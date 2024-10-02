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
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response } from "express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SignInUserDto } from "./dto/sign-in.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("signup")
  signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.signUp(createUserDto, res);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.usersService.signIn(
      signInUserDto.email,
      signInUserDto.password
    );
  }

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
