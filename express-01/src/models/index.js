import Sequelize from "sequelize";

import getUserModel from "./user";
import getMessageModel from "./message";

const sequelize = new Sequelize(
  process.env.POSTGRESQL_DATABASE,
  process.env.POSTGRESQL_USER,
  process.env.POSTGRESQL_PASSWORD,
  {
    // native: true,
    dialect: "postgres",
    host: process.env.POSTGRESQL_HOST,
    dialectModule: require('pg'),
    dialectOptions: {
      ssl: true,
      sslmode: 'require'
    }
  }
);

const models = {
  User: getUserModel(sequelize, Sequelize),
  Message: getMessageModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
