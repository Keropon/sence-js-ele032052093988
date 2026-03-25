// E4-M7: Transacción de Transferencia Bancaria Segura
// Usa un cliente dedicado del pool para mantener todas las operaciones en la misma sesión

const pool = require('./db');

async function realizarTransferencia(cuentaOrigenId, cuentaDestinoId, monto) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        await client.query(
            'UPDATE cuentas SET saldo = saldo - $1 WHERE id = $2',
            [monto, cuentaOrigenId]
        );

        await client.query(
            'UPDATE cuentas SET saldo = saldo + $1 WHERE id = $2',
            [monto, cuentaDestinoId]
        );

        await client.query('COMMIT');
        console.log(`Transferencia de $${monto} de cuenta ${cuentaOrigenId} a cuenta ${cuentaDestinoId} realizada con éxito.`);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error en la transferencia. Transacción revertida.', err.message);
    } finally {
        client.release();
    }
}

async function main() {
    await realizarTransferencia(1, 2, 100.00);
    await realizarTransferencia(2, 1, 600.00);
    await pool.end();
}

main();
