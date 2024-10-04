import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { JwtModule } from "@nestjs/jwt";
import { MailModule } from "../mail/mail.module";
// import { AuthModule } from "../auth/auth.module";
import { MailService } from "../mail/mail.service";
import { BotModule } from "../bot/bot.module";
import { Bot } from "../bot/models/bot.model";
import { Otp } from "../otp/models/otp.model";

@Module({
  imports: [
    SequelizeModule.forFeature([User,Bot,Otp]),
    JwtModule.register({}),
    MailModule,
    BotModule,
    Otp,
    // forwardRef(()=>AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService,MailService],
  exports: [UsersService,MailService]
})
export class UsersModule {}
