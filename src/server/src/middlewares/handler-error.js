const { StatusCodes } = require("http-status-codes");
const { customResponse } = require("../helpers/responseHelpers");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong. Try again later.",
  };

  // Handling Mongoose Validation Errors
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Handling MongoDB Duplicate Key Error
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Handling Mongoose CastError (Invalid ObjectId)
  if (err.name === "CastError") {
    customError.msg = `No item found with id ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  // Use customResponse helper to format the error response
  return res
    .status(customError.statusCode)
    .json(customResponse(customError.statusCode, customError.msg, null));
};

module.exports = errorHandlerMiddleware;
