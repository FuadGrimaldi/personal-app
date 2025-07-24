const authService = require("../services/mysql/auth.service");
const { customResponse } = require("../../../helpers/responseHelpers");

const { BadRequesError } = require("../../../errors");

const signIn = async (req, res, next) => {
  try {
    const data = await authService.signIn(req);
    res
      .status(201)
      .json(customResponse(201, "Login successfully", { token: data }));
  } catch (error) {
    const statusCode = error.statusCode || 400;
    const errorMessage = error.message || "Failed to Login";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const signUp = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      throw new BadRequesError(
        "Password and password confirmation do not match"
      );
    }
    const user = await authService.signUp(req.body);

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
  signIn,
  signUp,
};
