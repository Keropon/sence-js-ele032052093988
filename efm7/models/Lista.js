import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Lista = sequelize.define('Lista', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    posicion: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

export default Lista;
