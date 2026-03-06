const User = require("../../models/user.model");
const { NotFoundError } = require("../../../../errors");
const bcrypt = require("bcryptjs");
const { deleteFileIfExists } = require("../../../../helpers/deleteImage");

const updateUser = async (id, data, file) => {
  const user = await User.findByPk(id);
  if (!user) throw new NotFoundError("User not found");
  let imagePath = user.avatar;
  if (file) {
    // 🔹 Hapus gambar lama
    deleteFileIfExists(user.avatar);

    // 🔹 Ganti path gambar baru
    imagePath = `uploads/avatars/${file.filename}`;
  }

  const result = await User.update(
    {
      username: data.username || user.username,
      name: data.name || user.name,
      role: data.role || user.role,
      avatar: imagePath || user.avatar,
      age: data.age || user.age,
      phone: data.phone || user.phone,
      job: data.job || user.job,
      country: data.country || user.country,
      province: data.province || user.province,
      city: data.city || user.city,
      address_details: data.address_details || user.address_details,
      description: data.description || user.description,
    },
    { where: { id } }, // ✅ BENAR
  );

  if (!result[0]) throw new Error("User not found or not updated");

  return await User.findByPk(id);
};
const resetPassword = async (id, data) => {
  const result = await User.update(
    {
      password: data.password
        ? await bcrypt.hash(data.password, 10)
        : user.password, // biar tidak undefined
    },
    { where: { id } }, // ✅ BENAR
  );

  if (!result[0]) throw new Error("User not found or not updated");

  return await User.findByPk(id);
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    raw: true,
  });
  if (!user) throw new NotFoundError("User not found");
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll({ raw: true });
  return users;
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new NotFoundError("User not found");

  const result = await User.destroy({ where: { id } });
  if (!result) throw new NotFoundError("User not found or not deleted");

  return { message: "User deleted successfully" };
};

module.exports = {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
  resetPassword,
};
