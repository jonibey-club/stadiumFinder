import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import * as uuid from "uuid";
import { Response } from "express";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly jwtService: JwtService
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

    const response = {
      message: "User registered successfully",
      user: updatedUser[1][0],
      access_token: tokens.access_token,
    };
    return response;
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
}
