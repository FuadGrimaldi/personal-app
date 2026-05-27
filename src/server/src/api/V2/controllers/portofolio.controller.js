const {
  createPortofolio,
  getAllPortofolio,
  getPortofolioById,
} = require("../services/mysql/portofolio.service");
const { customResponse } = require("../../../helpers/responseHelpers");

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res
        .status(401)
        .json(customResponse(401, "No user ID in token", null));
    }
    const data = await createPortofolio(req.body, req.file, userId);
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
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const type = req.query.type || null;
    const featured = req.query.featured || null;

    const data = await getAllPortofolio(page, limit, type, featured);
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
        req.file,
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
        req.params.id,
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
