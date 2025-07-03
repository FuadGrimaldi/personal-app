const authService = require("../services/mongoose/auth.service");
const { customResponse } = require("../../../helpers/responseHelpers");
const { createUserSchema } = require("../requests/user.request");

const { BadRequesError } = require("../../../errors");

const signInCMS = async (req, res, next) => {
  try {
    const data = await authService.signIn(req);
    res
      .status(201)
      .json(customResponse(201, "Login successfully", { token: data }));
  } catch (error) {
    next(error);
  }
};

const signUpCMS = async (req, res) => {
  try {
    await createUserSchema.validateAsync(req.body);
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
  signInCMS,
  signUpCMS,
};
