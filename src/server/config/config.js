const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  uri: process.env.MONGODB_URI,
  dbname: process.env.DBNAME,
  port: process.env.PORT,
  secret_key: process.env.JWT_SECRET,
  jwt_expiration: "24h",
  gmail: process.env.GMAIL,
  password: process.env.PASSWORD,
};
