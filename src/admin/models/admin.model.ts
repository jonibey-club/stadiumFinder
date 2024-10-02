import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr{
  name: string;
  login: string;
  telegram_link: string;
  admin_photo: string;
  hashed_password: string;
  is_active: boolean;
  is_creator: boolean;
  hashed_refresh_token: string;
}

@Table({tableName: "admin"})
export class Admin extends Model<Admin,IAdminCreationAttr>{
  @ApiProperty({
    example: 1,
    description: "Admin ID",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "admin",
    description: "Admin's name",
  })
  @Column({
    type: DataType.STRING(100),
    unique: true,
  })
  name: string;


  @ApiProperty({
    example: "admin123",
    description: "Admin's login",
  })
  @Column({
    type: DataType.STRING(100),
    unique: true,
  })
  login: string;

  @ApiProperty({
    example: "https://t.me/admin",
    description: "Admin's telegram link",
  })
  @Column({
    type: DataType.STRING(200),
  })
  telegram_link: string;

  @ApiProperty({
    example: "https://example.com/admin.jpg",
    description: "Admin's photo link",
  })
  @Column({
    type: DataType.STRING(200),
  })
  admin_photo: string;


  @ApiProperty({
    example: "adminpassword",
    description: "Admin's hashed password,it will be hash in the backend",
  })
  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
  })
  hashed_password: string;

  @ApiProperty({
    example: true,
    description: "Admin's status(active,not active - boolean(true,false),defaultValue-false)",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;


  @ApiProperty({
    example: true,
    description: "Admin's creator status(admin,not admin - boolean(true,false),defaultValue-false)",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;

  @ApiProperty({
    example: "admin_refresh_token",
    description: "Admin's hashed refresh token,it will be hash in the backend",
  })
  @Column({
    type: DataType.STRING(1000),
  })
  hashed_refresh_token: string;
}
