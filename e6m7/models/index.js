import sequelize from '../database.js';
import Usuario from './Usuario.js';
import Publicacion from './Publicacion.js';

// Relaciones
Usuario.hasMany(Publicacion);
Publicacion.belongsTo(Usuario);

export { sequelize, Usuario, Publicacion };
