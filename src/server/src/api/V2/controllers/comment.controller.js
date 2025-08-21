const commentService = require("../services/mysql/comment.service");
const { customResponse } = require("../../../helpers/responseHelpers");

const createComment = async (req, res) => {
  try {
    const data = await commentService.createComment(req);
    res
      .status(201)
      .json(customResponse(201, "Comment created successfully", data));
  } catch (error) {
    console.error(error);
    // Return proper error response with error handler
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};
const getAllComments = async (req, res) => {
  try {
    // Ambil parameter pagination dari query
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit, 10) || 5, 1);
    const offset = (page - 1) * limit;
    const result = await commentService.getAllComments({ offset, limit });

    // Ambil data dari service
    const { comments, total } = Array.isArray(result)
      ? { comments: result, total: result.length }
      : { comments: result?.comments || [], total: result?.total || 0 };

    res.status(200).json(
      customResponse(200, "Comments fetched successfully", {
        comments,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      })
    );
  } catch (error) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await commentService.deleteComment(id);
    res
      .status(204)
      .json(customResponse(204, "Comment deleted successfully", result));
  } catch (error) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const getCommentByIdPortofolio = async (req, res) => {
  try {
    const id_porto = req.params.id_porto;

    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit, 10) || 5, 1);
    const offset = (page - 1) * limit;

    const result = await commentService.getCommentByIdPortofolio({
      id_porto,
      offset,
      limit,
    });

    const { comments, total } = Array.isArray(result)
      ? { comments: result, total: result.length }
      : { comments: result?.comments || [], total: result?.total || 0 };

    res.status(200).json(
      customResponse(200, "Comments fetched successfully", {
        comments,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(result.total / limit),
        },
      })
    );
  } catch (error) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const updateComment = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await commentService.updateComment(id, req.body);
    res
      .status(200)
      .json(customResponse(200, "Comment updated successfully", data));
  } catch (error) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

module.exports = {
  createComment,
  getAllComments,
  deleteComment,
  getCommentByIdPortofolio,
  updateComment,
};
