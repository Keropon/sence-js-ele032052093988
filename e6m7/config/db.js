// Conexión a PostgreSQL mediante Sequelize ORM

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME     || 'tu_base_de_datos',
    process.env.DB_USER     || 'tu_usuario',
    process.env.DB_PASSWORD || 'tu_contraseña',
    {
        host:    process.env.DB_HOST || 'localhost',
        port:    process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false,
    }
);

export default sequelize;
