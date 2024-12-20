import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Comfort } from "../../comfort/models/comfort.model";
import { Stadium } from "../../stadium/models/stadium.model";

interface IComfortStadiumCreationAttr {
  stadium_id: number;
  comfort_id: number;
}

@Table({ tableName: "comfort_stadium", timestamps: false })
export class ComfortStadium extends Model<
  ComfortStadium,
  IComfortStadiumCreationAttr
> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Stadium)
  @Column({ type: DataType.INTEGER })
  stadium_id: number;

  @ForeignKey(() => Comfort)
  @Column({ type: DataType.INTEGER })
  comfort_id: number;

  @BelongsTo(() => Stadium)
  stadium: Stadium;

  @BelongsTo(() => Comfort)
  comfort: Comfort;
}
