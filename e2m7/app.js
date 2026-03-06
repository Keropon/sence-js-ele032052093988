
import pool from './db';

async function getUsers() {
    try {
        const resultado = await pool.query('SELECT * FROM usuarios');
        console.log('Todos los usuarios:');
        console.log(resultado.rows);
    } catch (err) {
        console.error('Error al obtener usuarios:', err.message);
    }
}

async function getUsersByEmail(email) {
    try {
        const consulta = 'SELECT * FROM usuarios WHERE email = $1';
        const valores = [email];
        const resultado = await pool.query(consulta, valores);

        if (resultado.rows.length === 0) {
            console.log(`No se encontró ningún usuario con email: ${email}`);
        } else {
            console.log(`Usuario encontrado (${email}):`);
            console.log(resultado.rows[0]);
        }
    } catch (err) {
        console.error('Error al buscar usuario:', err.message);
    }
}

async function main() {
    await getUsers();
    await getUsersByEmail('ana.garcia@example.com');
    await getUsersByEmail('noexiste@example.com');
    await pool.end();
}

main();
