// const mongoose = require("mongoose");
const config = require("../../config/config");
const { Sequelize } = require("sequelize");

const database = new Sequelize(config.dbname, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
});

const connectDBMysql = async () => {
  try {
    await database.authenticate();
    console.log(`MySQL Connected on ${config.host}`);
  } catch (error) {
    console.error("MySQL connection error:", error);
  }
};

const closeDbMysql = async () => {
  try {
    await database.close();
    console.log("MySQL connection closed");
  } catch (error) {
    console.error("Error closing MySQL connection", error);
  }
};

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(config.uri);
    console.log(`Database Connected on ${config.uri}`);
  } catch (error) {
    console.log(error);
  }
};

const closeDb = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error closing mongoDB connection", error);
  }
};

module.exports = {
  connectDb,
  closeDb,
  connectDBMysql,
  closeDbMysql,
  database,
};
