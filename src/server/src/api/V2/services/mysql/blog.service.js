const Blog = require("../../models/blog.model");
const { NotFoundError } = require("../../../../errors");
const { deleteFileIfExists } = require("../../../../helpers/deleteImage");

const createBlog = async (data, file) => {
  const imagePath = file
    ? `uploads/blog/${file.filename}`
    : "uploads/blog/default.jpg";
  const result = await Blog.create({
    title: data.title,
    description: data.description,
    slug: data.slug,
    image: imagePath,
    type: data.type,
    id_user: data.id_user || null,
  });

  return result;
};

const updateBlog = async (id, data, file) => {
  const existing = await Blog.findByPk(id);
  if (!existing) throw new Error("Blog not found");

  let imagePath = existing.projectImage;

  if (file) {
    // 🔹 Hapus gambar lama
    deleteFileIfExists(existing.projectImage);

    // 🔹 Ganti path gambar baru
    imagePath = `uploads/blog/${file.filename}`;
  }

  const result = await Blog.update(
    {
      title: data.title,
      description: data.description,
      slug: data.slug,
      image: imagePath,
      type: data.type,
      id_user: data.id_user || null,
    },
    { where: { id } }
  );

  if (!result[0]) throw new Error("Blog not found or not updated");

  return await Blog.findByPk(id);
};

const getAllBlog = async () => {
  return await Blog.findAll();
};

const getBlogById = async (id) => {
  const item = await Blog.findByPk(id);
  if (!item) throw new NotFoundError("Blog not found");
  return item;
};

const getBlogByType = async (type) => {
  const items = await Blog.findAll({ where: { type } });
  return items;
};
const getBlogBySlug = async (slug) => {
  const items = await Blog.findAll({ where: { slug } });
  return items;
};

const deleteBlog = async (id) => {
  const item = await Blog.findByPk(id);
  if (!item) throw new NotFoundError("Blog not found");
  deleteFileIfExists(item.image);
  await item.destroy();
  return;
};

module.exports = {
  createBlog,
  updateBlog,
  getAllBlog,
  getBlogById,
  getBlogByType,
  deleteBlog,
  getBlogBySlug,
};
