import { ComfortModule } from "./comfort/comfort.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { CategoriesModule } from "./categories/categories.module";
import { RegionModule } from "./region/region.module";
import { DistrictModule } from "./district/district.module";
import { ConfigModule } from "@nestjs/config";
import { join } from "node:path";
import { SequelizeModule } from "@nestjs/sequelize";
import { Comfort } from "./comfort/models/comfort.model";
import { District } from "./district/models/district.model";
import { Region } from "./region/models/region.model";
import { Categories } from "./categories/models/categories.model";
import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { MailModule } from "./mail/mail.module";
import { UserCardModule } from "./user_card/user_card.module";
import { UserCard } from "./user_card/models/user_card.model";
import { UserWalletModule } from "./user_wallet/user_wallet.module";
import { UserWallet } from "./user_wallet/models/user_wallet.model";
import { BotModule } from "./bot/bot.module";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/models/admin.model";
import { Bot } from "./bot/models/bot.model";
import { Address } from "./bot/models/address.model";
import { Cars } from "./bot/models/cars.model";
import { OtpModule } from "./otp/otp.module";
import { Otp } from "./otp/models/otp.model";
import { ComfortStadiumModule } from "./comfort-stadium/comfort-stadium.module";
import { ComfortStadium } from "./comfort-stadium/models/comfort-stadium.model";
import { StadiumModule } from "./stadium/stadium.module";
import { Stadium } from "./stadium/models/stadium.model";
import { CommentsModule } from "./comments/comments.module";
import { Comments } from "./comments/models/comments.model";
import { MediaModule } from "./media/media.module";
import { Media } from "./media/models/media.model";
import { StadiumTimesModule } from "./stadium-times/stadium-times.module";
import { StadiumTime } from "./stadium-times/models/stadium-time.model";
import { CartModule } from "./cart/cart.module";
import { Cart } from "./cart/models/cart.model";
import { OrdersModule } from "./orders/orders.module";
import { Order } from "./orders/models/order.model";

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        include: [BotModule],
        middlewares: [],
      }),
    }),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Comfort,
        Region,
        Categories,
        District,
        User,
        UserCard,
        UserWallet,
        Admin,
        Bot,
        Address,
        Cars,
        Otp,
        ComfortStadium,
        Stadium,
        Comments,
        Media,
        StadiumTime,
        Cart,
        Order,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    ComfortModule,
    CategoriesModule,
    RegionModule,
    DistrictModule,
    UsersModule,
    MailModule,
    UserCardModule,
    UserWalletModule,
    BotModule,
    AdminModule,
    OtpModule,
    ComfortStadiumModule,
    StadiumModule,
    CommentsModule,
    MediaModule,
    StadiumTimesModule,
    CartModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
