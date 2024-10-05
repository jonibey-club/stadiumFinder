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
import { Cart } from "../../cart/models/cart.model";
import { Order } from "../../orders/models/order.model";

interface IStadiumTimesCreationAttr {
  stadium_id: number;
  start_time: Date;
  end_time: Date;
  price: number;
}

@Table({ tableName: "stadium_times", timestamps: false })
export class StadiumTime extends Model<StadiumTime, IStadiumTimesCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Stadium)
  @Column({ type: DataType.INTEGER })
  stadium_id: number;

  @Column({ type: DataType.TIME })
  start_time: Date;

  @Column({ type: DataType.TIME })
  end_time: Date;

  @Column({ type: DataType.INTEGER })
  price: number;

  @BelongsTo(() => Stadium)
  stadium: Stadium;

  @HasMany(() => Cart)
  cart: Cart[];

  @HasMany(() => Order)
  orders: Order[];
}
