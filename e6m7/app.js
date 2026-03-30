import 'dotenv/config';
import { sequelize, Usuario, Publicacion } from './models/index.js';

async function main() {
    await sequelize.sync();
    console.log('Tablas sincronizadas.');

    const nuevoUsuario = await Usuario.create({
        nombre: 'Carlos',
        email:  'carlos@example.com',
    });
    console.log(`Usuario creado: ${nuevoUsuario.nombre} (ID: ${nuevoUsuario.id})`);

    await nuevoUsuario.createPublicacion({
        titulo:    'Mi primera publicación',
        contenido: 'Este es el contenido de mi post, creado con Sequelize.',
    });
    await nuevoUsuario.createPublicacion({
        titulo:    'Aprendiendo relaciones en Sequelize',
        contenido: 'hasMany y belongsTo permiten modelar relaciones uno a muchos.',
    });
    console.log('Publicaciones creadas.');

    const usuarioConPublicaciones = await Usuario.findByPk(nuevoUsuario.id, {
        include: Publicacion,
    });

    console.log('\nUsuario con sus publicaciones:');
    console.log(JSON.stringify(usuarioConPublicaciones, null, 2));

    await sequelize.close();
}

main();
