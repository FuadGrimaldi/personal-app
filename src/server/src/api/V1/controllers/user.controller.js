const userService = require("../services/mongoose/user.service");
const { customResponse } = require("../../../helpers/responseHelpers");
const { createUserSchema } = require("../../requests/user.request");

const getAllUser = async (req, res) => {
  try {
    const data = await userService.getAll(req);
    res
      .status(200)
      .json(customResponse(200, "User retrived successfully", data));
  } catch (error) {
    console.error(error);
    // Return proper error response with error handler
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const createUser = async (req, res) => {
  try {
    await createUserSchema.validateAsync(req.body);
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      throw new BadRequesError(
        "Password and password confirmation do not match"
      );
    }
    const user = await userService.createUser(req.body);

    res
      .status(201)
      .json(customResponse(201, "User created successfully", user));
  } catch (error) {
    const statusCode = error.statusCode || 400;
    const errorMessage = error.message || "Failed to create user";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

module.exports = {
  getAllUser,
  createUser,
};
