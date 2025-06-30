const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, config.secret_key, {
    expiresIn: config.jwt_expiration,
  });
  return token;
};

const createRefreshJWT = ({ payload }) => {
  const token = jwt.sign(payload, config.secret_key, {
    expiresIn: config.jwt_expiration,
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, config.secret_key);

const isTokenValidRefreshToken = ({ token }) =>
  jwt.verify(token, config.secret_key);

module.exports = {
  createJWT,
  isTokenValid,
  createRefreshJWT,
  isTokenValidRefreshToken,
};
