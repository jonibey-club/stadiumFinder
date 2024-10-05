import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Stadium } from "../../stadium/models/stadium.model";

interface ICategoriesCreationAttr {
  name: string;
  parentId: number;
}

@Table({ tableName: "categories", timestamps: false })
export class Categories extends Model<Categories, ICategoriesCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  // @ForeignKey(() => Categories)
  @Column({ type: DataType.INTEGER })
  parentId: number;

  // @BelongsTo(() => Categories)
  
  @HasMany(() => Stadium)
  stadiums: Stadium[];

  // @HasMany(() => Categories)
  // children: Categories[];
}
