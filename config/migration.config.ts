import * as dotenv from 'dotenv';
import * as mysqlDriver from 'mysql2';
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config({ path: __dirname + '/../.env' });

const datasource = new DataSource({
    driver: mysqlDriver,
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT ?? '', 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    synchronize: false,
    migrations: [__dirname + '/../migrations/*.ts'],
    entities: [__dirname + '/../**/entity/*.ts'],
    migrationsTableName: "migrations",
} as DataSourceOptions);
datasource.initialize();
export default datasource;