const { StatusCodes } = require("http-status-codes");

const CustomAPIErrors = require("./custom-api-error");

class NotFound extends CustomAPIErrors {
  constructor(message) {
    super(message);

    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFound;
