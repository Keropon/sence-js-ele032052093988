import 'dotenv/config';
import sequelize from './config/db.js';
import Producto  from './models/Producto.js';

async function main() {
    await sequelize.sync();
    console.log('Tabla sincronizada.');

    const laptop = await Producto.create({ nombre: 'Laptop', precio: 1200.50 });
    const mouse  = await Producto.create({ nombre: 'Mouse',  precio: 25.99  });
    console.log('Productos creados:', laptop.nombre, '|', mouse.nombre);

    const todos = await Producto.findAll();
    console.log('Todos los productos:');
    todos.forEach(p => console.log(`  [${p.id}] ${p.nombre} — $${p.precio}`));

    const uno = await Producto.findByPk(laptop.id);
    console.log(`Producto por ID ${laptop.id}:`, uno.nombre);

    await Producto.update({ precio: 1150.00 }, { where: { id: laptop.id } });
    console.log(`Precio de "${laptop.nombre}" actualizado a $1150.00`);

    await Producto.destroy({ where: { id: mouse.id } });
    console.log(`Producto "${mouse.nombre}" eliminado.`);

    await sequelize.close();
}

main();
