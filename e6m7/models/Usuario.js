import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Usuario = sequelize.define('Usuario', {
    nombre: { type: DataTypes.STRING },
    email:  { type: DataTypes.STRING },
});

export default Usuario;
