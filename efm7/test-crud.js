// EF-M7: Script de verificación CRUD — sin Express, solo lógica de base de datos
// Prerequisito: ejecutar primero `node seed.js`
// Uso: node test-crud.js

import sequelize from './database.js';
import Usuario  from './models/Usuario.js';
import Tablero  from './models/Tablero.js';
import Lista    from './models/Lista.js';
import Tarjeta  from './models/Tarjeta.js';

// Registrar relaciones
Usuario.hasMany(Tablero);
Tablero.belongsTo(Usuario);

Tablero.hasMany(Lista);
Lista.belongsTo(Tablero);

Lista.hasMany(Tarjeta);
Tarjeta.belongsTo(Lista);

async function testCrud() {
    try {
        await sequelize.authenticate();
        console.log('Conexión verificada.\n');

        // --- CREAR ---
        // Obtener la primera Lista existente para asociar la tarjeta
        const primeraLista = await Lista.findOne();
        if (!primeraLista) throw new Error('No hay listas en la base de datos. Ejecuta seed.js primero.');

        const nuevaTarjeta = await Tarjeta.create({
            titulo:      'Tarjeta de prueba CRUD',
            descripcion: 'Creada por test-crud.js',
            ListaId:     primeraLista.id,
        });
        console.log(`[CREATE] Tarjeta creada: "${nuevaTarjeta.titulo}" (ID: ${nuevaTarjeta.id})`);

        // --- LEER ---
        // Obtener el primer Tablero incluyendo sus Listas y Tarjetas (Eager Loading)
        const tablero = await Tablero.findOne({
            include: {
                model:   Lista,
                include: Tarjeta,
            },
        });
        console.log(`\n[READ] Tablero: "${tablero.nombre}"`);
        tablero.Listas.forEach(lista => {
            console.log(`  Lista: "${lista.nombre}"`);
            lista.Tarjetas.forEach(t =>
                console.log(`    Tarjeta [${t.completada ? 'x' : ' '}]: ${t.titulo}`)
            );
        });

        // --- ACTUALIZAR ---
        await nuevaTarjeta.update({ titulo: 'Tarjeta CRUD — título actualizado' });
        console.log(`\n[UPDATE] Tarjeta ${nuevaTarjeta.id} renombrada a: "${nuevaTarjeta.titulo}"`);

        // --- BORRAR ---
        await nuevaTarjeta.destroy();
        console.log(`[DELETE] Tarjeta ${nuevaTarjeta.id} eliminada.`);

        console.log('\nTodas las operaciones CRUD completadas con éxito.');
    } catch (err) {
        console.error('Error en test-crud:', err.message);
    } finally {
        await sequelize.close();
    }
}

testCrud();
