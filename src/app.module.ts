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
import { UsersModule } from './users/users.module';
import { User } from "./users/models/user.model";
import { MailModule } from './mail/mail.module';
import { UserCardModule } from './user_card/user_card.module';
import { UserCard } from "./user_card/models/user_card.model";
import { UserWalletModule } from './user_wallet/user_wallet.module';
import { UserWallet } from "./user_wallet/models/user_wallet.model";
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory:()=> ({
        token: process.env.BOT_TOKEN,
        include: [BotModule],
        middlewares: [],
      })
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
      models: [Comfort, Region, Categories, District,User,UserCard,UserWallet],
      autoLoadModels: true,
      sync: { alter: true },
      // logging: true
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
