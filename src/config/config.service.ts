// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config()

// require('dotenv').config();

class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) { }

    public getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }

        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    public getPort() {
        return this.getValue('PORT', true);
    }

    public getHost() {
        return this.getValue('HOST', true);
    }

    public isProduction() {
        const mode = this.getValue('NODE_ENV', false);
        return mode != 'DEV';
    }

    public getDbConfig() {
        return {
            database: this.getValue('POSTGRES_DB'),
            user: this.getValue('POSTGRES_USER'),
            password: this.getValue('POSTGRES_PASSWORD'),
            host: this.getValue('POSTGRES_HOST'),
            port: Number(this.getValue('POSTGRES_PORT')),
            max: Number(this.getValue('POSTGRES_DB_POOL_SIZE')),
            idleTimeOutMillis: Number(this.getValue('POSTGRES_DB_POOL_CLIENT_IDLE_TIMEOUT')),
            connectionTimeoutMillis: Number(this.getValue('POSTGRES_DB_POOL_CLIENT_CONNECTION_TIMEOUT')),
            ssl: { requestCert: false, rejectUnauthorized: false }
        };
    }

//   public getTypeOrmConfig(): TypeOrmModuleOptions {
//     return {
//       type: 'postgres',
//       host: this.getValue('POSTGRES_HOST'),
//       port: parseInt(this.getValue('POSTGRES_PORT')),
//       username: this.getValue('POSTGRES_USER'),
//       password: this.getValue('POSTGRES_PASSWORD'),
//       database: this.getValue('POSTGRES_DB'),

//       // entities: ["src/**/*.entity.{ts,js}"],
//       entities: ["dist/**/*.entity.js"],

//       migrationsTableName: 'migration',

//       // migrations: ['src/db/migrations/*.ts'],
//       migrations: ['dist/src/db/migrations/*.js'],

//       ssl: this.isProduction(),
//     };
//   }
}

const configService = new ConfigService(process.env)
  .ensureValues([
    'PORT',
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DB'
  ]);

export { configService };