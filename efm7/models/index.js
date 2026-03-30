import sequelize from '../database.js';
import Usuario from './Usuario.js';
import Tablero from './Tablero.js';
import Lista from './Lista.js';
import Tarjeta from './Tarjeta.js';

// Relaciones
Usuario.hasMany(Tablero);
Tablero.belongsTo(Usuario);

Tablero.hasMany(Lista);
Lista.belongsTo(Tablero);

Lista.hasMany(Tarjeta);
Tarjeta.belongsTo(Lista);

export { sequelize, Usuario, Tablero, Lista, Tarjeta };
