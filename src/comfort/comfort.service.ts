import { Injectable } from "@nestjs/common";
import { CreateComfortDto } from "./dto/create-comfort.dto";
import { UpdateComfortDto } from "./dto/update-comfort.dto";
import { Comfort } from "./models/comfort.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class ComfortService {
  constructor(@InjectModel(Comfort) private comfortModel: typeof Comfort) {}
  create(createComfortDto: CreateComfortDto) {
    return this.comfortModel.create(createComfortDto);
  }

  findAll() {
    return this.comfortModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.comfortModel.findByPk(id);
  }

  update(id: number, updateComfortDto: UpdateComfortDto) {
    return this.comfortModel.update(updateComfortDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.comfortModel.destroy({ where: { id } });
  }
}
