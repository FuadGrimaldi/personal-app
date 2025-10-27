const {
  createPortofolio,
  getAllPortofolio,
  getPortofolioById,
} = require("../services/mysql/portofolio.service");
const { customResponse } = require("../../../helpers/responseHelpers");

const create = async (req, res, next) => {
  try {
    const data = await createPortofolio(req.body, req.file);
    res
      .status(201)
      .json(customResponse(201, "Portofolio created successfully", data));
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const getAll = async (req, res, next) => {
  try {
    const data = await getAllPortofolio();
    res
      .status(200)
      .json(customResponse(200, "Portofolio retrieved successfully", data));
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const getById = async (req, res, next) => {
  try {
    const data = await getPortofolioById(req.params.id);
    if (!data) {
      return res.status(404).json(customResponse("Portofolio not found", null));
    }
    res
      .status(200)
      .json(customResponse(200, "Portofolio retrieved successfully", data));
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};
const update = async (req, res, next) => {
  try {
    const data =
      await require("../services/mysql/portofolio.service").updatePortofolio(
        req.params.id,
        req.body,
        req.file
      );
    if (!data) {
      return res
        .status(404)
        .json(customResponse(404, "Portofolio not found", null));
    }
    res
      .status(200)
      .json(customResponse(200, "Portofolio updated successfully", data));
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const remove = async (req, res, next) => {
  try {
    const result =
      await require("../services/mysql/portofolio.service").deletePortofolio(
        req.params.id
      );
    if (!result) {
      return res
        .status(404)
        .json(customResponse(404, "Portofolio not found", null));
    }
    res
      .status(200)
      .json(customResponse(200, "Portofolio deleted successfully", null));
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
