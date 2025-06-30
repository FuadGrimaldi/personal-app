const corsConfig = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, credentials"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  // If it's an OPTIONS request, respond with a 200 status code
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
};

module.exports = corsConfig;
