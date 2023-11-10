import 'dotenv/config';
import { SequelizeClient } from '@clients/sequelize';

async function main() {
  console.log('Syncing database...');
  await SequelizeClient.sync({ alter: true });
  console.log('Done!');
}

main();
