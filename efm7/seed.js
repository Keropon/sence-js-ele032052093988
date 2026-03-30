import 'dotenv/config';
import { sequelize, Usuario, Tablero, Lista, Tarjeta } from './models/index.js';

async function seed() {
    try {
        await sequelize.sync({ force: true });
        console.log('Tablas creadas (force: true — datos previos eliminados).');

        // Usuarios
        const ana = await Usuario.create({ nombre: 'Ana García', email: 'ana@kanbanpro.com' });
        const luis = await Usuario.create({ nombre: 'Luis Fernández', email: 'luis@kanbanpro.com' });
        console.log('Usuarios creados:', ana.nombre, '|', luis.nombre);

        // Tableros
        const tableroAna1 = await Tablero.create({ nombre: 'Proyecto Web', descripcion: 'Desarrollo del sitio corporativo', UsuarioId: ana.id });
        const tableroAna2 = await Tablero.create({ nombre: 'Marketing Q1', descripcion: 'Campañas del primer trimestre', UsuarioId: ana.id });
        const tableroLuis = await Tablero.create({ nombre: 'Backend API', descripcion: 'Endpoints REST del sistema', UsuarioId: luis.id });
        console.log('Tableros creados: 3');

        // Listas
        const porHacer = await Lista.create({ nombre: 'Por Hacer', posicion: 1, TableroId: tableroAna1.id });
        const enProgreso = await Lista.create({ nombre: 'En Progreso', posicion: 2, TableroId: tableroAna1.id });
        const terminado = await Lista.create({ nombre: 'Terminado', posicion: 3, TableroId: tableroAna1.id });
        const backlog = await Lista.create({ nombre: 'Backlog', posicion: 1, TableroId: tableroLuis.id });
        const enRevision = await Lista.create({ nombre: 'En Revisión', posicion: 2, TableroId: tableroLuis.id });
        console.log('Listas creadas: 5');

        // Tarjetas
        await Tarjeta.create({ titulo: 'Diseñar homepage', descripcion: 'Crear mockup en Figma', ListaId: porHacer.id });
        await Tarjeta.create({ titulo: 'Configurar dominio', descripcion: 'DNS y SSL', ListaId: porHacer.id });
        await Tarjeta.create({ titulo: 'Integrar formulario', descripcion: 'Formulario de contacto', ListaId: enProgreso.id });
        await Tarjeta.create({ titulo: 'Subir prototipo', descripcion: 'Deploy en Vercel', ListaId: terminado.id, completada: true });
        await Tarjeta.create({ titulo: 'Endpoint /usuarios', descripcion: 'GET, POST, PUT, DELETE', ListaId: backlog.id });
        await Tarjeta.create({ titulo: 'Autenticación JWT', descripcion: 'Login con tokens', ListaId: enRevision.id });
        console.log('Tarjetas creadas: 6');

        console.log('\nSeed completado con éxito.');
    } catch (err) {
        console.error('Error durante el seed:', err.message);
    } finally {
        await sequelize.close();
    }
}

seed();
