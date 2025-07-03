const { BadRequesError, NotFoundError } = require("../../../../errors");
const Image = require("../../models/image.model");

const createAvatar = async (req) => {
  const result = await Image.create({
    name: req.file
      ? `uploads/avatars/${req.file.filename}`
      : "uploads/avatars/default.jpg",
  });
  return result;
};

const createProject = async (req) => {
  const result = await Image.create({
    name: req.file
      ? `uploads/projects/${req.file.filename}`
      : "uploads/projects/default.jpg",
  });
  return result;
};

const checkImage = async (id) => {
  const result = await Image.findOne({ _id: id });
  if (!result) throw new NotFoundError("image not found");
  return result;
};

module.exports = {
  createAvatar,
  createProject,
  checkImage,
};
