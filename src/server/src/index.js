const configureMiddleware = require("./middlewares/middleware");
const { app, startServer } = require("../config/server");
const NotFoundMiddleware = require("./middlewares/not-found");
const handlerErrorMiddleware = require("./middlewares/handler-error");
const corsConfig = require("./middlewares/cors");
const router = require("./routes/router");

// CORS Configuration
app.use(corsConfig);

// Middleware
configureMiddleware(app);

// router
app.use("/api", router);

// test welcome
app.use("/", (req, res) => {
  res.status(200).json({
    message: "Portofolio API is running",
  });
});

// middleware error
app.use(NotFoundMiddleware);
app.use(handlerErrorMiddleware);

startServer();
