import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { db } from '../client';

interface VersionModel
  extends Model<
    InferAttributes<VersionModel>,
    InferCreationAttributes<VersionModel>
  > {
  id?: number;
  page: string;
  version: string;
}

export const Version = db.define<VersionModel>('version', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  page: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  version: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
