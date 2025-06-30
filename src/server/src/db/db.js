const mongoose = require("mongoose");
const config = require("../../config/config");

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
};
