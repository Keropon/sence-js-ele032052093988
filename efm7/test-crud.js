import 'dotenv/config';
import { sequelize, Usuario, Tablero, Lista, Tarjeta } from './models/index.js';

async function testCrud() {
    try {
        console.log('\n🔌 CONECTANDO A LA BASE DE DATOS');
        await sequelize.authenticate();
        console.log('Conexión exitosa');

        console.log('\nCREAR TARJETA');

        const primeraLista = await Lista.findOne();
        if (!primeraLista) throw new Error('No hay listas. Ejecuta seed.js primero.');

        const nuevaTarjeta = await Tarjeta.create({
            titulo:      'Tarjeta de prueba CRUD',
            descripcion: 'Creada por test-crud.js',
            ListaId:     primeraLista.id,
        });

        console.table([nuevaTarjeta.toJSON()]);

        console.log('\nLEER TABLERO CON LISTAS Y TARJETAS');

        const tablero = await Tablero.findOne({
            include: {
                model:   Lista,
                include: Tarjeta,
            },
        });

        console.log('\nTABLERO');
        console.table([{ id: tablero.id, nombre: tablero.nombre, descripcion: tablero.descripcion }]);

        console.log('\nLISTAS');
        console.table(tablero.Listas.map(l => ({ id: l.id, nombre: l.nombre, TableroId: l.TableroId })));

        console.log('\nTARJETAS');
        console.table(
            tablero.Listas.flatMap(l =>
                l.Tarjetas.map(t => ({ id: t.id, titulo: t.titulo, completada: t.completada, ListaId: t.ListaId }))
            )
        );

        console.log('\nLEER USUARIO CON SUS TABLEROS');

        const usuario = await Usuario.findOne({ include: Tablero });

        console.table([{ id: usuario.id, nombre: usuario.nombre, email: usuario.email }]);
        console.table(usuario.Tableros.map(t => ({ id: t.id, nombre: t.nombre, UsuarioId: t.UsuarioId })));

        console.log('\nFILTRAR TARJETAS COMPLETADAS (completada: true)');

        const tarjetasCompletadas = await Tarjeta.findAll({ where: { completada: true } });

        console.table(tarjetasCompletadas.map(t => ({ id: t.id, titulo: t.titulo, completada: t.completada })));

        console.log('\nACTUALIZAR TARJETA (findByPk)');

        const tarjeta = await Tarjeta.findByPk(1);
        if (!tarjeta) throw new Error('No existe la tarjeta con ID 1. Verifica que el seed se haya ejecutado.');

        const estadoAntes = { id: tarjeta.id, titulo: tarjeta.titulo, completada: tarjeta.completada };

        await tarjeta.update({ titulo: 'Diseñar homepage — revisado', completada: true });

        const estadoDespues = { id: tarjeta.id, titulo: tarjeta.titulo, completada: tarjeta.completada };

        console.log('Antes:');
        console.table([estadoAntes]);
        console.log('Después:');
        console.table([estadoDespues]);

        console.log('\nBORRAR TARJETA');

        const datosEliminados = nuevaTarjeta.toJSON();
        await nuevaTarjeta.destroy();

        console.log('Tarjeta eliminada:');
        console.table([datosEliminados]);

        console.log('\nPRUEBAS CRUD FINALIZADAS');

    } catch (err) {
        console.error('\nError en test-crud:', err.message);
    } finally {
        await sequelize.close();
    }
}

testCrud();
