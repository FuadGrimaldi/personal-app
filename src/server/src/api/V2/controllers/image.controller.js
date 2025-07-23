const imageService = require("../services/mysql/image.service");
const { customResponse } = require("../../../helpers/responseHelpers");

const createImageAvatar = async (req, res) => {
  try {
    const data = await imageService.createAvatar(req);
    res
      .status(201)
      .json(customResponse(201, "Images avatar created successfully", data));
  } catch (error) {
    console.error(error);
    // Return proper error response with error handler
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};
const createImageProject = async (req, res) => {
  try {
    const data = await imageService.createProject(req);
    res
      .status(201)
      .json(customResponse(201, "Images project created successfully", data));
  } catch (error) {
    console.error(error);
    // Return proper error response with error handler
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

module.exports = {
  createImageAvatar,
  createImageProject,
};
