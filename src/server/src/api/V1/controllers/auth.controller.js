const authService = require("../services/mongoose/auth.service");
const { customResponse } = require("../../../helpers/responseHelpers");

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

module.exports = {
  signInCMS,
};
