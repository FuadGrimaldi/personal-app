const express = require("express");
const config = require("./config");
const { connectDb, closeDb } = require("../src/db/db.js");

const app = express();

const startServer = async () => {
  try {
    await connectDb(); // Connect to database
    const server = app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });

    // Graceful Shutdown
    process.on("SIGINT", async () => {
      console.log("SIGINT signal received: closing HTTP server");
      server.close(async () => {
        console.log("HTTP server closed");
        await closeDb(); // Close the database connection
        process.exit(0); // Exit process with success
      });
    });
  } catch (error) {
    console.error("Unable to start server:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = {
  app,
  startServer,
};
