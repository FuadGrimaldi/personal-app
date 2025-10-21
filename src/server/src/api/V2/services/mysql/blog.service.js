const Portofolio = require("../../models/portofolio.model");
const { NotFoundError } = require("../../../../errors");
const { deleteFileIfExists } = require("../../../../helpers/deleteImage");

const createBlog = async (data, file) => {
  const imagePath = file
    ? `uploads/blog/${file.filename}`
    : "uploads/blog/default.jpg";
  const result = await Portofolio.create({
    title: data.title,
    description: data.description,
    image: imagePath,
    type: data.type,
    id_user: data.id_user || null,
  });

  return result;
};

const getAllBlog = async () => {
  return await Portofolio.findAll();
};

const getBlogById = async (id) => {
  const item = await Portofolio.findByPk(id);
  if (!item) throw new NotFoundError("Blog not found");
  return item;
};

const getBlogByType = async (type) => {
  const items = await Portofolio.findAll({ where: { type } });
  return items;
};

const deleteBlog = async (id) => {
  const item = await Portofolio.findByPk(id);
  if (!item) throw new NotFoundError("Blog not found");
  deleteFileIfExists(item.image);
  await item.destroy();
  return;
};

module.exports = {
  createBlog,
  getAllBlog,
  getBlogById,
  getBlogByType,
  deleteBlog,
};
