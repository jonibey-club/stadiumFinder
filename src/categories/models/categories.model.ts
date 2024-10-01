import { Column, DataType, Model, Table } from "sequelize-typescript";

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

  @Column({ type: DataType.INTEGER })
  parentId: number;
}
