const { StatusCodes } = require("http-status-codes");

const CustomAPIErrors = require("./custom-api-error");

class Unauthorized extends CustomAPIErrors {
  constructor(message) {
    super(message);

    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = Unauthorized;
