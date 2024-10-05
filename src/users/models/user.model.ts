import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { UserCard } from "../../user_card/models/user_card.model";
import { UserWallet } from "../../user_wallet/models/user_wallet.model";
import { Stadium } from "../../stadium/models/stadium.model";
import { Comments } from "../../comments/models/comments.model";
import { Cart } from "../../cart/models/cart.model";
import { Order } from "../../orders/models/order.model";

interface IUserCreationAttr {
  full_name: string;
  email: string;
  phone: string;
  tg_link: string;
  hashed_password: string;
  photo: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the user",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: "Sardor",
    description: "The fullname of the user",
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING(20),
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  tg_link: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING(200),
  })
  photo: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_owner: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @HasMany(() => Stadium)
  stadiums: Stadium[];

  @HasMany(() => UserCard)
  userCards: UserCard[];

  @HasMany(() => UserWallet)
  userWallets: UserWallet[];

  @HasMany(() => Comments)
  comments: Comments[];

  @HasMany(() => Cart)
  cart: Cart[];

  @HasMany(() => Order)
  orders: Order[];
}
