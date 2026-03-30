import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Publicacion = sequelize.define('Publicacion', {
    titulo:    { type: DataTypes.STRING },
    contenido: { type: DataTypes.TEXT   },
});

export default Publicacion;
