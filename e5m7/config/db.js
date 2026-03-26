import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:    process.env.DB_HOST,
        port:    process.env.DB_PORT,
        dialect: 'postgres',
        logging: false,
    }
);

sequelize.authenticate()
    .then(() => console.log('Conexión a PostgreSQL establecida con Sequelize.'))
    .catch(err => console.error('Error de conexión:', err.message));

export default sequelize;
