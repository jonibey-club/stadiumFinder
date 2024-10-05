import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Stadium } from "../../stadium/models/stadium.model";

interface IMediaCreationAttr {
  stadium_id: number;
  photo: string;
  desription: string;
}

@Table({ tableName: "media", timestamps: false })
export class Media extends Model<Media, IMediaCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Stadium)
  @Column({ type: DataType.INTEGER })
  stadium_id: number;

  @Column({ type: DataType.STRING })
  photo: string;

  @Column({ type: DataType.STRING })
  description: string;

  @BelongsTo(() => Stadium)
  stadium: Stadium;
}
