const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "public/uploads"; // default

    if (file.fieldname === "avatar") folder = "public/uploads/avatars";
    else if (file.fieldname === "blog") folder = "public/uploads/blog";
    else if (file.fieldname === "projectImage")
      folder = "public/uploads/portofolio";

    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueDate = Date.now();
    cb(null, uniqueDate + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

const uploadMiddleware = multer({
  storage,
  limits: {
    filesize: 3000000,
  },
  fileFilter: fileFilter,
});

module.exports = uploadMiddleware;
