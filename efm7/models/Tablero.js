import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Tablero = sequelize.define('Tablero', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
});

export default Tablero;
