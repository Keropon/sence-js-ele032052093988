import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Tarjeta = sequelize.define('Tarjeta', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    completada: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

export default Tarjeta;
