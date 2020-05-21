require('dotenv/config');

module.exports = {
  development: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'database_development',
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  },
};
