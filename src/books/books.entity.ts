import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class books extends Model<books> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    field: '_id',
  })
  _id: number;
  
  @Column
  name: string;

  @Column
  price: number;

  @Column
  descript: string;

  @Column
  full_descript: string;
}