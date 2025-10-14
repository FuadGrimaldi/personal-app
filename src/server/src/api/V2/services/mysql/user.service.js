const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const { NotFoundError } = require("../../../../errors");

const updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) throw new NotFoundError("User not found");

  const result = await User.update(
    {
      email: data.email,
      username: data.username,
      name: data.name,
      password: data.password
        ? await bcrypt.hash(data.password, 10)
        : user.password, // biar tidak undefined
      role: data.role || user.role,
      age: data.age,
      phone: data.phone,
      job: data.job,
      country: data.country,
      province: data.province,
      city: data.city,
      address_details: data.address_details,
      description: data.description,
    },
    { where: { id } } // ✅ BENAR
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
};
