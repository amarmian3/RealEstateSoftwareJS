import { Sequelize } from 'sequelize';
import 'dotenv/config';
import { Logger } from './logger';

export class Database {
  private static instance: Sequelize | null = null;
  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;
      if (!DB_HOST || !DB_USER || !DB_PASS || !DB_NAME) {
        throw new Error('Missing DB environment variables');
      }
      Database.instance = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
        host: DB_HOST,
        port: Number(DB_PORT ?? 3306),
        dialect: 'mysql',
        logging: false,
        pool: { max: 10, idle: 30_000, acquire: 30_000 },
      });
    }
    return Database.instance;
  }

  public static async connect(): Promise<void> {
    await Database.getInstance().authenticate();
    Logger.info('✅ Database connection established');
  }
}
