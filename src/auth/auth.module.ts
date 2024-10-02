import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "../admin/admin.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "MySecretKey",
      signOptions: { expiresIn: "1h" },
    }),
    forwardRef(() => AdminModule),
    UsersModule,
  ],
  exports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
