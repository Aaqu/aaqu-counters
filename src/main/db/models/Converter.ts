import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { db } from '../client';

interface ConverterModel
  extends Model<
    InferAttributes<ConverterModel>,
    InferCreationAttributes<ConverterModel>
  > {
  id?: number;
  type: string;
  address: string;
  port: number;
}

export const Converter = db.define<ConverterModel>(
  'converter',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    port: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
