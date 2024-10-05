import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ComfortStadium } from "../../comfort-stadium/models/comfort-stadium.model";

interface IComfortCreationAttr {
  name: string;
}

@Table({ tableName: "comfort", timestamps: false })
export class Comfort extends Model<Comfort, IComfortCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => ComfortStadium)
  comfortStadiums: ComfortStadium[];
}
