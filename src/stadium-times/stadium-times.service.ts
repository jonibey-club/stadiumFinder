import { Injectable } from "@nestjs/common";
import { CreateStadiumTimeDto } from "./dto/create-stadium-time.dto";
import { UpdateStadiumTimeDto } from "./dto/update-stadium-time.dto";
import { InjectModel } from "@nestjs/sequelize";
import { StadiumTime } from "./models/stadium-time.model";

@Injectable()
export class StadiumTimesService {
  constructor(
    @InjectModel(StadiumTime) private stadiumTimeModel: typeof StadiumTime
  ) {}
  create(createStadiumTimeDto: CreateStadiumTimeDto) {
    return this.stadiumTimeModel.create(createStadiumTimeDto);
  }

  findAll() {
    return this.stadiumTimeModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.stadiumTimeModel.findByPk(id);
  }

  update(id: number, updateStadiumTimeDto: UpdateStadiumTimeDto) {
    return this.stadiumTimeModel.update(updateStadiumTimeDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.stadiumTimeModel.destroy({ where: { id } });
  }
}
