import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Comments } from "./models/comments.model";

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comments) private commentsModel: typeof Comments) {}
  create(createCommentDto: CreateCommentDto) {
    return this.commentsModel.create(createCommentDto);
  }

  findAll() {
    return this.commentsModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.commentsModel.findByPk(id);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentsModel.update(updateCommentDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.commentsModel.destroy({ where: { id } });
  }
}
