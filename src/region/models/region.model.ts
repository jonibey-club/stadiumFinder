import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { District } from "../../district/models/district.model";

interface IRegionCreationAttr {
  name: string;
}

@Table({ tableName: "region", timestamps: false })
export class Region extends Model<Region, IRegionCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => District)
  districts: District[];
}
