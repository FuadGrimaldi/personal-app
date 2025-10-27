const {
  getAllBlog,
  getBlogById,
  getBlogByType,
  createBlog,
  deleteBlog,
  getBlogBySlug,
  updateBlog,
} = require("../services/mysql/blog.service");

const { customResponse } = require("../../../helpers/responseHelpers");

const create = async (req, res, next) => {
  try {
    const data = await createBlog(req.body, req.file);
    res
      .status(201)
      .json(customResponse(201, "Blog created successfully", data));
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const update = async (req, res, next) => {
  try {
    const data = await updateBlog(req.params.id, req.body, req.file);
    if (!data) {
      return res.status(404).json(customResponse(404, "Blog not found", null));
    }
    res
      .status(200)
      .json(customResponse(200, "Blog updated successfully", data));
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const getAll = async (req, res, next) => {
  try {
    const data = await getAllBlog();
    res
      .status(200)
      .json(customResponse(200, "Blog retrieved successfully", data));
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const getById = async (req, res, next) => {
  try {
    const data = await getBlogById(req.params.id);
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

const getByType = async (req, res, next) => {
  try {
    const data = await getBlogByType(req.params.type);
    if (!data) {
      return res.status(404).json(customResponse("Blogs not found", null));
    }
    res
      .status(200)
      .json(customResponse(200, "Blogs retrieved successfully", data));
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};
const getBySlug = async (req, res, next) => {
  try {
    const data = await getBlogBySlug(req.params.slug);
    if (!data) {
      return res.status(404).json(customResponse("Blogs not found", null));
    }
    res
      .status(200)
      .json(customResponse(200, "Blogs retrieved successfully", data));
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const remove = async (req, res, next) => {
  try {
    await deleteBlog(req.params.id);
    res
      .status(200)
      .json(customResponse(200, "Blog deleted successfully", null));
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

module.exports = {
  create,
  update,
  getAll,
  getById,
  getByType,
  getBySlug,
  remove,
};
