import { Injectable } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Media } from "./models/media.model";

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media) private mediaModel: typeof Media) {}
  create(createMediaDto: CreateMediaDto) {
    return this.mediaModel.create(createMediaDto);
  }

  findAll() {
    return this.mediaModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.mediaModel.findByPk(id);
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return this.mediaModel.update(updateMediaDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.mediaModel.destroy({ where: { id } });
  }
}
