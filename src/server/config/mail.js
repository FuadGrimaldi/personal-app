const { Resend } = require("resend");
const config = require("./config");

const resendClient = new Resend(config.apiKeyResend);

module.exports = { resendClient };
