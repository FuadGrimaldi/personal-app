const userService = require("../services/mysql/user.service");
const { customResponse } = require("../../../helpers/responseHelpers");
const { BadRequesError } = require("../../../errors");

const getAllUsers = async (req, res, next) => {
  try {
    const data = await userService.getAllUsers();
    const usersWithoutPassword = data.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    res
      .status(200)
      .json(
        customResponse(200, "User retrieved successfully", usersWithoutPassword)
      );
  } catch (error) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const getUserById = async (req, res, next) => {
  try {
    const data = await userService.getUserById(req.params.id);
    if (!data) {
      return res.status(404).json(customResponse("User not found", null));
    }
    const { password, ...usersWithoutPassword } = data;
    res
      .status(200)
      .json(
        customResponse(200, "User retrieved successfully", usersWithoutPassword)
      );
  } catch (error) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;
    if (password && password !== confirmPassword) {
      throw new BadRequesError(
        "Password and password confirmation do not match"
      );
    }
    const data = await userService.updateUser(req.params.id, req.body);
    if (!data) {
      return res.status(404).json(customResponse(404, "User not found", null));
    }
    res
      .status(200)
      .json(customResponse(200, "User updated successfully", data));
  } catch (error) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await userService.deleteUser(id);
    res
      .status(200)
      .json(customResponse(200, "User deleted successfully", result));
  } catch (error) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
