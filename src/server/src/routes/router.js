const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const { authenticateUser } = require("../middlewares/auth");

const authController = require("../api/V1/controllers/auth.controller");

// loginCMS
router.post("/auth/signin/cms", authController.signInCMS);

router.get("/test", (req, res) => {
  res.status(200).json({
    message: "Testing API is running",
  });
});

// User Routes
router.get(
  "/users",
  require("../api/V1/controllers/user.controller").getAllUser
);
router.post(
  "/users",
  require("../api/V1/controllers/user.controller").createUser
);

module.exports = router;
