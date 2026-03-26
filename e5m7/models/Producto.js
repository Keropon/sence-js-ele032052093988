import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Producto = sequelize.define('Producto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

export default Producto;
