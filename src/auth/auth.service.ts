import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { JwtService } from "@nestjs/jwt";
import { SignInAdminDto } from "./dto/signIn-admin.dto";
import { AdminService } from "../admin/admin.service";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { Admin } from "../admin/models/admin.model";
import { User } from "../users/models/user.model";
import { MailService } from "../mail/mail.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { Response } from "express";
import { UsersService } from "../users/users.service";
import { SignInUserDto } from "./dto/signIn.dto";
import { UpdateUserDto } from "../users/dto/update-user.dto";
import { UpdateAdminDto } from "../admin/dto/update-admin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private userService: UsersService,
    private readonly mailService: MailService
  ) {}

  async signUp_admin(createAdminDto: CreateAdminDto, res: Response) {
    const candidate = await this.adminService.findAdminByEmail(
      createAdminDto.login
    );
    if (candidate) {
      throw new BadRequestException("Bunday admin mavjud!");
    }

    const newAdmin = await this.adminService.create({
      ...createAdminDto,
    });

    const tokens = await this.generateTokenAdmin(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 3);
    let updateAdminDto: UpdateAdminDto = {
      hashed_refresh_token,
    };
    const updatedAdmin = await this.adminService.update(
      newAdmin.id,
      updateAdminDto
    );

    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    const response = {
      message: "Admin registered successfully",
      admin: updatedAdmin[1][0],
      access_token: tokens.access_token,
    };
    return response;
  }

  async generateTokenAdmin(admin: Admin) {
    const payload = {
      sub: admin.id,
      login: admin.login,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }

  async signIn_admin(signInDto: SignInAdminDto) {
    const admin = await this.adminService.findAdminByEmail(signInDto.login);
    if (!admin) {
      throw new UnauthorizedException("Admin not found");
    }

    const validPassword = await bcrypt.compare(
      signInDto.hashed_password,
      admin.hashed_password
    );

    if (!validPassword) {
      throw new UnauthorizedException("Admin not found");
    }
    return this.generateTokenAdmin(admin);
  }

  async signOutAdmin(refreshToken: string, res: Response) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const admin = await this.userService.findOne(payload.id);
    if (!admin) {
      throw new BadRequestException("admin not found");
    }

    await this.userService.update(admin.id, { hashed_refresh_token: null });

    res.clearCookie("refresh_token");

    return {
      message: "admin successfully logouted",
    };
  }

  async refreshTokensAdmin(refresh_token: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const admin = await this.adminService.findOne(payload.id);
      if (!admin) {
        throw new UnauthorizedException("Admin not found");
      }

      const valid_refresh_token = await bcrypt.compare(
        refresh_token,
        admin.hashed_refresh_token
      );
      if (!valid_refresh_token) {
        throw new UnauthorizedException("Unauthorized admin");
      }

      const tokens = await this.generateTokenAdmin(admin);
      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 3);

      await this.adminService.update(admin.id, { hashed_refresh_token });

      res.cookie("refresh_token", tokens.refresh_token, {
        httpOnly: true,
        maxAge: +process.env.REFRESH_TIME_MS,
      });

      return {
        access_token: tokens.access_token,
      };
    } catch (error) {
      throw new BadRequestException("Expired token");
    }
  }

  async signUp(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userService.findUserByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException("User already exists");
    }

    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }


    const newUser = await this.userService.create({
      ...createUserDto,
    });

    const tokens = await this.generateTokens(newUser);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 4);
    const activation_link = uuid.v4();
    let updateUserDto: UpdateUserDto = {
      hashed_refresh_token,
      activation_link,
    };
    const updatedUser = await this.userService.update(
      newUser.id,
      updateUserDto
    );
    res.cookie("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    try {
      await this.mailService.sendMail(updatedUser[1][0]);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Error sending mail");
    }

    const response = {
      message: "User registered successfully",
      user: updatedUser[1][0],
      access_token: tokens.access_token,
    };
    return response;
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.hashed_password);

    if (!isMatch) {
      throw new BadRequestException("Invalid password");
    }

    const tokens = await this.generateTokens(user);
    return {
      user,
      access_token: tokens.access_token,
    };
  }

  async signOut(refreshToken: string, res: Response) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const user = await this.userService.findOne(payload.id);
    if (!user) {
      throw new BadRequestException("User not found");
    }

    await this.userService.update(user.id, { hashed_refresh_token: null });

    res.clearCookie("refresh_token");

    return {
      message: "User successfully logouted",
    };
  }

  async refreshTokens(refresh_token: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const user = await this.userService.findOne(payload.id);
      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      const valid_refresh_token = await bcrypt.compare(
        refresh_token,
        user.hashed_refresh_token
      );
      if (!valid_refresh_token) {
        throw new UnauthorizedException("Unauthorized user");
      }

      const tokens = await this.generateTokens(user);
      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 3);

      await this.userService.update(user.id, { hashed_refresh_token });

      res.cookie("refresh_token", tokens.refresh_token, {
        httpOnly: true,
        maxAge: +process.env.REFRESH_TIME_MS,
      });

      return {
        access_token: tokens.access_token,
      };
    } catch (error) {
      throw new BadRequestException("Expired token");
    }
  }

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }
}
