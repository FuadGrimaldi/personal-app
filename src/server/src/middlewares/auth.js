const { UnauthorizedError, UnauthenticatedError } = require("../errors");
const { isTokenValid } = require("../middlewares/jwt");

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    // check header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }
    if (!token) {
      throw new UnauthenticatedError("Authentication invalid");
    }
    const payload = isTokenValid({ token });

    // user permission to req object
    req.user = {
      email: payload.email,
      role: payload.role,
      name: payload.name,
      id: payload.userId,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticateUser };
