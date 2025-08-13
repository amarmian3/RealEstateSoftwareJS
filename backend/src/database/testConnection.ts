import { Sequelize } from 'sequelize';
import 'dotenv/config';

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;
if (!DB_HOST || !DB_USER || !DB_PASS || !DB_NAME) throw new Error('Missing DB envs');

console.log('Environment variables loaded:');
console.log('DB_HOST =', process.env.DB_HOST);
console.log('DB_PORT =', process.env.DB_PORT);
console.log('DB_USER =', process.env.DB_USER);
console.log('DB_PASS =', process.env.DB_PASS ? '(hidden)' : undefined);
console.log('DB_NAME =', process.env.DB_NAME);

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: Number(DB_PORT ?? 3306),
  dialect: 'mysql',
  logging: false,
  pool: { max: 10, idle: 30_000, acquire: 30_000 },
  // dialectOptions: { ssl: { rejectUnauthorized: true } }, // if your RDS enforces SSL
});

(async () => {
  await sequelize.authenticate();
  console.log('✅ Connected');
})();
