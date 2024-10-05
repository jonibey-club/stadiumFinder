import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { UserWallet } from "../../user_wallet/models/user_wallet.model";
import { StadiumTime } from "../../stadium-times/models/stadium-time.model";

interface IOrdersCreationAttr {
  user_id: number;
  user_wallet_id: number;
  st_times_id: number;
  date: Date;
  created_at: Date;
}

@Table({ tableName: "orders", timestamps: false })
export class Order extends Model<Order, IOrdersCreationAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: number;

  @ForeignKey(() => UserWallet)
  @Column({ type: DataType.INTEGER })
  user_wallet_id: number;

  @ForeignKey(() => StadiumTime)
  @Column({ type: DataType.INTEGER })
  st_times_id: number;

  @Column({ type: DataType.DATE })
  date: Date;

  @Column({ type: DataType.DATE })
  created_at: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => UserWallet)
  userWallet: UserWallet;

  @BelongsTo(() => StadiumTime)
  stadiumTime: StadiumTime;
}
