const express = require("express");

const app = express();

const port = 3000;

app.use("/", (req, res) => {
  res.send("Hello, World! this is the server running on port 3000");
});

app.listen(port, "0.0.0.0", () => {
  console.log("server is running in port 3000");
});
