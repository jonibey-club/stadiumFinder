import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { SignInAdminDto } from "./dto/signIn-admin.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInUserDto } from "./dto/signIn.dto";
import { Response } from "express";
import { CookieGetter } from "../decorators/cookie_getter.decorator";


@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Sign up for the new admin" })
  @ApiResponse({
    status: 201,
    description: "ro'yxatdan o'tdi",
    type: String,
  })
  @Post("signup-admin")
  async signUpAdmin(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signUp_admin(createAdminDto, res);
  }

  @ApiOperation({ summary: "Sign in for the signed up admin" })
  @HttpCode(200)
  @Post("signin-admin")
  async signInAdmin(@Body() signInDto: SignInAdminDto) {
    return this.authService.signIn_admin(signInDto);
  }

  @Post("signoutadmin")
  async signOutAdmin(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutAdmin(refreshToken, res);
  }

  @Post("refreshtokenadmin")
  async refreshTokenAdmin(
    @Res({ passthrough: true }) res: Response,
    @CookieGetter("refresh_token") refresh_token: string
  ) {
    return this.authService.refreshTokensAdmin(refresh_token, res);
  }

  @ApiOperation({ summary: "Yangi foydalanuvchini ro'yxatdan o'tkazish!" })
  @ApiResponse({
    status: 201,
    description: "Ro'yxatdan o'tgan Foydalanuvchi",
    type: String,
  })
  @Post("signup")
  signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signUp(createUserDto, res);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signIn(signInUserDto.email, signInUserDto.password);
  }

  @Post("signout")
  async signOut(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res);
  }

  @Post("refreshtoken")
  async refreshToken(
    @Res({ passthrough: true }) res: Response,
    @CookieGetter("refresh_token") refresh_token: string
  ) {
    return this.authService.refreshTokens(refresh_token, res);
  }
}
