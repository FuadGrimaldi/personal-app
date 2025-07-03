const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const { authenticateUser } = require("../middlewares/auth");

const authController = require("../api/V1/controllers/auth.controller");
const userController = require("../api/V1/controllers/user.controller");

router.get("/test", (req, res) => {
  res.status(200).json({
    message: "Testing 123 API is running",
  });
});
// loginCMS
router.post("/auth/signin", authController.signInCMS);

router.post("/auth/signup", authController.signUpCMS);

// User Routes
router.get("/users", userController.getAllUser);

module.exports = router;
