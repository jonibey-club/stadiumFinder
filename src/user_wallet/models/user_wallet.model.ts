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
import { Cart } from "../../cart/models/cart.model";
import { Order } from "../../orders/models/order.model";

interface IUserWalletCreationAttr {
  userId: number;
  wallet: number;
}

@Table({ tableName: "user_wallet" })
export class UserWallet extends Model<UserWallet, IUserWalletCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  wallet: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Cart)
  cart: Cart[];

  @HasMany(() => Order)
  orders: Order[];
}
