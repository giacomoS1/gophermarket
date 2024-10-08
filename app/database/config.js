import "dotenv/config";
import pkg from "pg";

const { Pool } = pkg; // this seems a little redundant, but it needs to be done because of how pg works as a commonjs module with exports

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    max: 10, // the maximum number of users in pool at one time
    idleTimoutMillis: 3000, // closes idle pool connections after 30 seconds
    connectionTimeoutMillis: 2000 // waits 2 seconds for connection before throwing an error
});

export default pool;