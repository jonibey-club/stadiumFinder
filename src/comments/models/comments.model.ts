import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Stadium } from "../../stadium/models/stadium.model";

interface ICommentsCreationAttr {
  user_id: number;
  stadium_id: number;
  impression: string;
}

@Table({ tableName: "comment", timestamps: false })
export class Comments extends Model<Comments, ICommentsCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: number;

  @ForeignKey(() => Stadium)
  @Column({ type: DataType.INTEGER })
  stadium_id: number;

  @Column({ type: DataType.STRING })
  impression: string;

  @BelongsTo(() => Stadium)
  stadium: Stadium;

  @BelongsTo(() => User)
  user: User;
}
