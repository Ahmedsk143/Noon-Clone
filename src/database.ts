import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();
const DBConnection = new Pool({
    // user: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // host: process.env.DB_HOST,
    connectionString: process.env.DATABASE_URL,
});

export default DBConnection;
