const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const { authenticateUser } = require("../middlewares/auth");

const authController = require("../api/V1/controllers/auth.controller");
const authControllerV2 = require("../api/V2/controllers/auth.controller");

const userController = require("../api/V1/controllers/user.controller");
const imageController = require("../api/V1/controllers/image.controller");
const userControllerV2 = require("../api/V2/controllers/user.controller");
const imageControllerV2 = require("../api/V2/controllers/image.controller");
const portofolioControllerV2 = require("../api/V2/controllers/portofolio.controller");
const commentControllerV2 = require("../api/V2/controllers/comment.controller");
const blogControllerV2 = require("../api/V2/controllers/blog.controller");

router.get("/test", (req, res) => {
  res.status(200).json({
    message: "Testing 123 API is running",
  });
});
// V1 Routes
// loginCMS
router.post("/v1/auth/signin", authController.signInCMS);
router.post("/v1/auth/signup", authController.signUpCMS);
// User Routes
router.get("/v1/users", userController.getAllUser);
// images
router.post(
  "/v1/image-avatar",
  upload.single("avatar"),
  imageController.createImageAvatar
);
router.post(
  "/v1/image-project",
  upload.single("projectImage"),
  imageController.createImageProject
);

// V2 Routes
router.post("/v2/auth/signin", authControllerV2.signIn);
router.post("/v2/auth/signup", authControllerV2.signUp);
router.post(
  "/v2/image-avatar",
  upload.single("avatar"),
  imageControllerV2.createImageAvatar
);
router.post(
  "/v2/image-project",
  upload.single("projectImage"),
  imageControllerV2.createImageProject
);
// Portofolio Routes
router.post(
  "/v2/portofolio",
  // authenticateUser,
  upload.single("projectImage"),
  portofolioControllerV2.create
);
router.get("/v2/portofolio", portofolioControllerV2.getAll);
router.get("/v2/portofolio/:id", portofolioControllerV2.getById);
router.put(
  "/v2/portofolio/:id",
  // authenticateUser,
  upload.single("projectImage"),
  portofolioControllerV2.update
);
router.delete(
  "/v2/portofolio/:id",
  // authenticateUser,
  portofolioControllerV2.remove
);

// Comment Routes
router.post(
  "/v2/comment",
  // authenticateUser,
  commentControllerV2.createComment
);
router.get("/v2/comment", commentControllerV2.getAllComments);
router.delete(
  "/v2/comment/:id",
  // authenticateUser,
  commentControllerV2.deleteComment
);
router.get(
  "/v2/comment/portofolio/:id_porto",
  // authenticateUser,
  commentControllerV2.getCommentByIdPortofolio
);
router.put(
  "/v2/comment/:id",
  // authenticateUser,
  commentControllerV2.updateComment
);

// User Routes
router.get("/V2/users", userControllerV2.getAllUsers);
router.get("/V2/users/:id", userControllerV2.getUserById);
router.put(
  "/V2/users/:id",
  // authenticateUser,
  userControllerV2.updateUser
);
router.delete(
  "/V2/users/:id",
  // authenticateUser,
  userControllerV2.deleteUser
);

// blog Routes
router.get("/v2/blog", blogControllerV2.getAll);
router.get("/v2/blog/type/:type", blogControllerV2.getByType);
router.get("/v2/blog/:id", blogControllerV2.getById);
router.post(
  "/v2/blog",
  // authenticateUser,
  upload.single("blog"),
  blogControllerV2.create
);
router.delete(
  "/v2/blog/:id",
  // authenticateUser,
  blogControllerV2.remove
);
module.exports = router;
