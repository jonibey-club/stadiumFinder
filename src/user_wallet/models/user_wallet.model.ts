import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface IUserWalletCreationAttr{
  userId: number;
  wallet: number;
}

@Table({tableName: "user_wallet"})
export class UserWallet extends Model<UserWallet,IUserWalletCreationAttr>{
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(()=> User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  wallet: number;

  @BelongsTo(()=> User)
  user: User;
}
