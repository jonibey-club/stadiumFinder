import { Module } from "@nestjs/common";
import { ComfortStadiumService } from "./comfort-stadium.service";
import { ComfortStadiumController } from "./comfort-stadium.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { ComfortStadium } from "./models/comfort-stadium.model";

@Module({
  imports: [SequelizeModule.forFeature([ComfortStadium])],
  controllers: [ComfortStadiumController],
  providers: [ComfortStadiumService],
})
export class ComfortStadiumModule {}
