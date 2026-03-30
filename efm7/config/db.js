import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME     || 'kanbanpro',
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
