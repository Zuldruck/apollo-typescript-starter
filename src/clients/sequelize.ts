import path from 'path';
import { Sequelize } from 'sequelize-typescript';

export { DataType } from 'sequelize-typescript';

export const SequelizeClient = new Sequelize({
  dialect: 'mysql',
  host: 'mysql',
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  models: [path.join(__dirname, '..', 'models', '*.model.ts')],
  modelMatch: (filename, member) => filename.substring(0, filename.indexOf('.model')) === member,
});
