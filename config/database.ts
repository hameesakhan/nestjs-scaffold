import * as mysqlDriver from 'mysql2';

export default () => ({
    driver: mysqlDriver,
    type: 'mysql' as const,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT ?? '', 3306),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    synchronize: false,
});
