import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Bot } from "./bot.model";

interface ICarsCreationAttr {
  user_id: number;
  car_numebr: number;
  model: string;
  color: string;
  year: number;
  last_state: string;
}

@Table({ tableName: "cars" })
export class Cars extends Model<Cars, ICarsCreationAttr> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  // @ForeignKey(() => Bot)
  @Column({
    type: DataType.BIGINT,
  })
  user_id: number;

  @Column({ type: DataType.INTEGER })
  car_number: number;

  @Column({ type: DataType.STRING })
  model: string;

  @Column({
    type: DataType.STRING,
  })
  color: string;

  @Column({ type: DataType.INTEGER })
  year: number;

  @Column({
    type: DataType.STRING,
  })
  last_state: string;

  // @BelongsTo(() => Bot)
  // bot: Bot;
}
