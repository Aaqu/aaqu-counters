import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { db } from '../client';

interface FaunModel
  extends Model<
    InferAttributes<FaunModel>,
    InferCreationAttributes<FaunModel>
  > {
  id?: number;
  name: string;
  type: string;
  converter: string;
  address: number;
}

export const Faun = db.define<FaunModel>(
  'Faun',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    converter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
