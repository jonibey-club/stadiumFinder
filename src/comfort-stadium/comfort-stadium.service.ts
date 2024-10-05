import { Injectable } from "@nestjs/common";
import { CreateComfortStadiumDto } from "./dto/create-comfort-stadium.dto";
import { UpdateComfortStadiumDto } from "./dto/update-comfort-stadium.dto";
import { InjectModel } from "@nestjs/sequelize";
import { ComfortStadium } from "./models/comfort-stadium.model";

@Injectable()
export class ComfortStadiumService {
  constructor(
    @InjectModel(ComfortStadium)
    private comfortStadiumModel: typeof ComfortStadium
  ) {}
  create(createComfortStadiumDto: CreateComfortStadiumDto) {
    return this.comfortStadiumModel.create(createComfortStadiumDto);
  }

  findAll() {
    return this.comfortStadiumModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.comfortStadiumModel.findByPk(id);
  }

  update(id: number, updateComfortStadiumDto: UpdateComfortStadiumDto) {
    return this.comfortStadiumModel.update(updateComfortStadiumDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.comfortStadiumModel.destroy({ where: { id } });
  }
}
