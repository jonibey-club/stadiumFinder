import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
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

  findUserByEmail(email: string) {
    return this.userModel.findOne({
      where: { email }
    });
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 3);
    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password: hashedPassword,
    });
    return newUser;
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
    return this.userModel.findOne({where: {id},include: { all: true } });
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
