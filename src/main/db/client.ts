import { Sequelize } from 'sequelize';
// import { dbPath } from '../main';

export const db = new Sequelize({
  dialect: 'sqlite',
  storage: './sql.db',
  logging: false,
});
