import * as dotenv from 'dotenv';
import * as mysqlDriver from 'mysql2';
import { DataSourceOptions } from 'typeorm';

dotenv.config({ path: __dirname + '/../.env' });

export function getConfig() {
    return {
        driver: mysqlDriver,
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT ?? '', 10),
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
        synchronize: false,
        migrations: [__dirname + '/../migrations/*.ts'],
        entities: [__dirname + '/../**/entity/*.ts'],
        migrationsTableName: "migrations",
    } as DataSourceOptions;
}