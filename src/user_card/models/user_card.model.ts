import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface IUserCardCreationAttr {
  user_id: number;
  name: string;
  phone: string;
  number: number;
  year: number;
  month: number;
  is_active: boolean;
  is_main: boolean;
}

@Table({ tableName: "user_card" })
export class UserCard extends Model<UserCard, IUserCardCreationAttr> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(()=> User)
  @Column({ type: DataType.INTEGER })
  user_id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.INTEGER })
  number: number;

  @Column({ type: DataType.INTEGER })
  year: number;

  @Column({ type: DataType.INTEGER })
  month: number;

  @Column({ type: DataType.BOOLEAN })
  is_active: boolean;

  @Column({ type: DataType.BOOLEAN })
  is_main: boolean;

  @BelongsTo(()=>User)
  user: User;
}
