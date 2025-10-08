const fs = require("fs");
const path = require("path");

const deleteFileIfExists = (filePath) => {
  if (!filePath || filePath.endsWith("default.jpg")) {
    return;
  }

  // Karena multer menyimpan di folder `public/uploads/...`
  const fullPath = path.join(process.cwd(), "public", filePath);

  try {
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (err) {
    console.error("❌ Error deleting file:", err);
  }
};

module.exports = { deleteFileIfExists };
