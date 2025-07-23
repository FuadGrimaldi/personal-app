const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  uri: process.env.MONGODB_URI,
  host: process.env.HOST,
  user: process.env.USER,
  dbname: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  portmysql: process.env.PORTDB,
  dialect: process.env.DIALECT,
  secret_key: process.env.JWT_SECRET,
  jwt_expiration: "24h",
  gmail: process.env.GMAIL,
};
