import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { JwtModule } from "@nestjs/jwt";
import { MailModule } from "../mail/mail.module";
// import { AuthModule } from "../auth/auth.module";
import { MailService } from "../mail/mail.service";

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({}),
    MailModule,
    // forwardRef(()=>AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService,MailService],
  exports: [UsersService,MailService]
})
export class UsersModule {}
