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
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response } from "express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SignInUserDto } from "./dto/sign-in.dto";
import { UserGuard } from "../guards/user.guard";
import { CookieGetter } from "../decorators/cookie_getter.decorator";

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

  @Get("activate/:link")
  async activateUser(@Param("link") link: string) {
    return this.usersService.activateUser(link);
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

  @Post("signout")
  async signOut(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.usersService.signOut(refreshToken, res);
  }

  @Post("refreshtoken")
  async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @CookieGetter("refresh_token") refresh_token: string
  ) {
    return this.usersService.refreshTokens(refresh_token, res);
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
