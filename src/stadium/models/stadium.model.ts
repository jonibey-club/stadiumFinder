import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { ComfortStadium } from "../../comfort-stadium/models/comfort-stadium.model";
import { Categories } from "../../categories/models/categories.model";
import { User } from "../../users/models/user.model";
import { Comments } from "../../comments/models/comments.model";
import { Media } from "../../media/models/media.model";
import { Region } from "../../region/models/region.model";
import { District } from "../../district/models/district.model";
import { StadiumTime } from "../../stadium-times/models/stadium-time.model";

interface IStadiumCreationAttr {
  category_id: number;
  owner_id: number;
  contact_with: string;
  name: string;
  volume: string;
  address: string;
  region_id: number;
  district_id: number;
  location: string;
  build_at: Date;
  start_time: string;
  end_time: string;
}

@Table({ tableName: "stadium", timestamps: false })
export class Stadium extends Model<Stadium, IStadiumCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Categories)
  @Column({ type: DataType.INTEGER })
  category_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  owner_id: number;

  @Column({ type: DataType.STRING })
  contact_with: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.INTEGER })
  volume: string;

  @Column({ type: DataType.STRING })
  address: string;

  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER })
  region_id: number;

  @ForeignKey(() => District)
  @Column({ type: DataType.INTEGER })
  district_id: number;

  @Column({ type: DataType.STRING })
  location: string;

  @Column({ type: DataType.DATE })
  build_at: Date;

  @Column({ type: DataType.STRING })
  start_time: string;

  @Column({ type: DataType.STRING })
  end_time: string;

  @BelongsTo(() => Categories)
  category: Categories;

  @BelongsTo(() => User)
  owner: User;

  @BelongsTo(() => Region)
  region: Region;

  @BelongsTo(() => District)
  district: District;

  @HasMany(() => ComfortStadium)
  comfortStadiums: ComfortStadium[];

  @HasMany(() => Comments)
  comments: Comments[];

  @HasMany(() => Media)
  media: Media[];

  @HasMany(() => StadiumTime)
  stadiumTimes: StadiumTime[];
}
