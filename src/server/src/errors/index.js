const CustomAPIErrors = require("./custom-api-error");
const BadRequesError = require("./bad-request");
const NotFoundError = require("./not-found");
const UnauthenticatedError = require("./unauthenticated");
const UnauthorizedError = require("./unauthorized");

module.exports = {
  CustomAPIErrors,
  BadRequesError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
};
