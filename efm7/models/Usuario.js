import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Usuario = sequelize.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
});

export default Usuario;
