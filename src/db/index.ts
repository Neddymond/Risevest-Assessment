import path from 'path';
import { Pool } from 'pg';
import { migrate } from 'postgres-migrations';
import { configService } from '../config/config.service';

const pool = new Pool(configService.getDbConfig());
const db = {
    runMigrations: async function (): Promise<void> {
        const client = await pool.connect();
        try {
            await migrate({ client }, path.resolve(__dirname, 'migrations'));
        } catch (error) {
            console.error('migration failed', error);
        } finally {
            client.release();
        }
    }
}

export { db, pool };