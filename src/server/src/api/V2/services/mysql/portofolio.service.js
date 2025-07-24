const Portofolio = require("../../models/portofolio.model");

const createPortofolio = async (data, file) => {
  const imagePath = file
    ? `uploads/portofolio/${file.filename}`
    : "uploads/portofolio/default.jpg";

  const result = await Portofolio.create({
    title: data.title,
    description: data.description,
    projectImage: imagePath,
    id_user: data.id_user || null,
  });

  return result;
};

const updatePortofolio = async (id, data, file) => {
  // Ambil data lama
  const existing = await Portofolio.findByPk(id);
  if (!existing) throw new Error("Portofolio not found");

  let imagePath = existing.projectImage; // default: gambar lama
  if (file) {
    imagePath = `uploads/portofolio/${file.filename}`;
  }

  const result = await Portofolio.update(
    {
      title: data.title,
      description: data.description,
      projectImage: imagePath,
    },
    { where: { id } }
  );

  if (!result[0]) throw new Error("Portofolio not found or not updated");

  return await Portofolio.findByPk(id);
};

const getAllPortofolio = async () => {
  return await Portofolio.findAll();
};

const getPortofolioById = async (id) => {
  const item = await Portofolio.findByPk(id);
  if (!item) throw new Error("Portofolio not found");
  return item;
};

const deletePortofolio = async (id) => {
  const item = await Portofolio.findByPk(id);
  if (!item) throw new Error("Portofolio not found");
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
