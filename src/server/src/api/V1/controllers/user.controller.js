const userService = require("../services/mongoose/user.service");
const { customResponse } = require("../../../helpers/responseHelpers");

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

module.exports = {
  getAllUser,
};
