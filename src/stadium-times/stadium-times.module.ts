import { Module } from "@nestjs/common";
import { StadiumTimesService } from "./stadium-times.service";
import { StadiumTimesController } from "./stadium-times.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { StadiumTime } from "./models/stadium-time.model";

@Module({
  imports: [SequelizeModule.forFeature([StadiumTime])],
  controllers: [StadiumTimesController],
  providers: [StadiumTimesService],
})
export class StadiumTimesModule {}
