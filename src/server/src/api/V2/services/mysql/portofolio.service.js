const Portofolio = require("../../models/portofolio.model");
const { deleteFileIfExists } = require("../../../../helpers/deleteImage");

const createPortofolio = async (data, file, id) => {
  const user_id = id || null;
  // Simpan path relatif tanpa "public" agar URL bisa langsung digunakan di frontend
  const imagePath = file
    ? `uploads/portofolio/${file.filename}`
    : "uploads/portofolio/default.jpg";

  const result = await Portofolio.create({
    title: data.title,
    description: data.description,
    projectImage: imagePath,
    id_user: user_id,
    featured: data.featured || "N",
    type: data.type,
  });

  return result;
};

const updatePortofolio = async (id, data, file) => {
  const existing = await Portofolio.findByPk(id);
  if (!existing) throw new Error("Portofolio not found");

  let imagePath = existing.projectImage;

  if (file) {
    // 🔹 Hapus gambar lama
    deleteFileIfExists(existing.projectImage);

    // 🔹 Ganti path gambar baru
    imagePath = `uploads/portofolio/${file.filename}`;
  }

  const result = await Portofolio.update(
    {
      title: data.title,
      description: data.description,
      featured: data.featured || "N",
      type: data.type,
      projectImage: imagePath,
    },
    { where: { id } },
  );

  if (!result[0]) throw new Error("Portofolio not found or not updated");

  return await Portofolio.findByPk(id);
};

const getAllPortofolio = async (page, limit, type, featured) => {
  const offset = (page - 1) * limit;

  const where = {};
  if (type) {
    where.type = type;
  }
  if (featured) {
    where.featured = featured;
  }

  const { count, rows } = await Portofolio.findAndCountAll({
    where: where,
    limit: limit,
    offset: offset,
  });

  return {
    item: rows,
    total: count,
    page: page,
    limit: limit,
    totalPages: Math.ceil(count / limit),
  };
};

const getPortofolioById = async (id) => {
  const item = await Portofolio.findByPk(id);
  return item;
};

const deletePortofolio = async (id) => {
  const item = await Portofolio.findByPk(id);
  if (!item) throw new Error("Portofolio not found");

  // 🔹 Hapus file gambar sebelum menghapus data
  deleteFileIfExists(item.projectImage);

  await Portofolio.destroy({ where: { id } });
  return { message: "Portofolio deleted successfully" };
};

module.exports = {
  createPortofolio,
  getAllPortofolio,
  getPortofolioById,
  updatePortofolio,
  deletePortofolio,
};
