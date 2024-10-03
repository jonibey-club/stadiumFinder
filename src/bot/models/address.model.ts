import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Bot } from "./bot.model";

interface IAddressCreationAttr {
  addrss_name: string;
  address: string;
  location: string;
  user_id: number;
  last_state: string;
}

@Table({ tableName: "address" })
export class Address extends Model<Address, IAddressCreationAttr> {
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

  @Column({ type: DataType.STRING })
  address_name: string;

  @Column({ type: DataType.STRING })
  address: string;

  @Column({ type: DataType.STRING })
  location: string;

  @Column({
    type: DataType.STRING,
  })
  last_state: string;

  // @BelongsTo(() => Bot)
  // bot: Bot;
}
