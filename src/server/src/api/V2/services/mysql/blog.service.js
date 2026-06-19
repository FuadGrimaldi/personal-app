const Blog = require("../../models/blog.model");
const { NotFoundError } = require("../../../../errors");
const { deleteFileIfExists } = require("../../../../helpers/deleteImage");
const { getCache, setCache, deleteCache } = require("../redis/cache.service");

const getAllBlog = async (page, limit, type) => {
  const cacheKey = `blogs:${page}:${limit}:${type || "all"}`;

  const cachedData = await getCache(cacheKey);

  if (cachedData) {
    console.log("CACHE HIT");
    return cachedData;
  }

  console.log("CACHE MISS -> MYSQL");

  const where = {};

  if (type) {
    where.type = type;
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Blog.findAndCountAll({
    limit,
    offset,
    where,
  });

  const result = {
    item: rows,
    total: count,
    page,
    limit,
    totalPages: Math.ceil(count / limit),
  };

  await setCache(cacheKey, result, 300);

  return result;
};

const getBlogBySlug = async (slug) => {
  const cacheKey = `blog:slug:${slug}`;

  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    console.log("CACHE HIT");
    return cachedData;
  }

  console.log("CACHE MISS -> MYSQL");

  const item = await Blog.findOne({ where: { slug } });
  if (!item) throw new NotFoundError("Blog not found");

  await setCache(cacheKey, item, 300);
  return item;
};

const createBlog = async (data, file, id) => {
  const user_id = id || null;
  const imagePath = file
    ? `uploads/blog/${file.filename}`
    : "uploads/blog/default.jpg";
  const result = await Blog.create({
    title: data.title,
    description: data.description,
    slug: data.slug,
    image: imagePath,
    type: data.type,
    id_user: user_id,
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
    { where: { id } },
  );

  if (!result[0]) throw new Error("Blog not found or not updated");

  return await Blog.findByPk(id);
};

const getBlogById = async (id) => {
  const cacheKey = `blog:id:${id}`;

  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    console.log("CACHE HIT");
    return cachedData;
  }

  console.log("CACHE MISS -> MYSQL");

  const item = await Blog.findByPk(id);
  if (!item) throw new NotFoundError("Blog not found");

  await setCache(cacheKey, item, 300);
  return item;
};

const getBlogByType = async (type) => {
  const items = await Blog.findAll({ where: { type } });
  return items;
};

const deleteBlog = async (id) => {
  const item = await Blog.findByPk(id);
  if (!item) throw new NotFoundError("Blog not found");
  deleteFileIfExists(item.image);
  await item.destroy({ whrere: { id } });
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
