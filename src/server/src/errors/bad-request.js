const { StatusCodes } = require("http-status-codes");

const CustomAPIErrors = require("./custom-api-error");

class BadRequest extends CustomAPIErrors {
  constructor(message) {
    super(message);

    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
