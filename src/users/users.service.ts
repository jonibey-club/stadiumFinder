import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import * as uuid from "uuid";
import { Response } from "express";
import { MailService } from "../mail/mail.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

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

  async signUp(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException("User already exists");
    }

    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 4);

    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
    });

    const tokens = await this.generateTokens(newUser);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 5);
    const activation_link = uuid.v4();
    const updatedUser = await this.userModel.update(
      {
        hashed_refresh_token,
        activation_link,
      },
      { where: { id: newUser.id }, returning: true }
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
    const user = await this.userModel.findOne({ where: { email } });
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

  async activateUser(
    link: string
  ): Promise<{ is_active: boolean; message: string }> {
    const user = await this.userModel.findOne({
      where: { activation_link: link, is_active: false },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.is_active) {
      throw new BadRequestException("User already activated");
    }

    user.is_active = true;
    await user.save();

    return {
      is_active: user.is_active,
      message: "User activated successfully",
    };
  }

  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.userModel.findOne({ include: { all: true } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }

  async refreshTokens(refresh_token: string, res: Response) {
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const user = await this.userModel.findOne({ where: { id: payload.id } });
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
      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

      await this.userModel.update(
        { hashed_refresh_token },
        { where: { id: user.id } }
      );

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
}
