import { Pool } from 'pg';

const pool = new Pool({
    user:     process.env.DB_USER,
    host:     process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port:     process.env.DB_PORT,
});

async function connectionTest() {
    let client;
    try {
        client = await pool.connect();
        console.log('Conexión exitosa a PostgreSQL.');
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } finally {
        if (client) client.release();
    }
}

connectionTest();
