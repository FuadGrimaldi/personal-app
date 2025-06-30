const User = require("../../models/user.model");
const { BadRequesError, UnauthorizedError } = require("../../../../errors");
const { createJWT } = require("../../../../middlewares/jwt");
const { createTokenUser } = require("../../../../helpers/createToken");

const signIn = async (req) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new BadRequesError("please provide email and password");

    const result = await User.findOne({ email: email });
    if (!result) throw new UnauthorizedError("Invalid Credentials");

    const isPasswordCorrect = await result.comparePassword(password);
    if (!isPasswordCorrect) throw new UnauthorizedError("Invalid Credentials");

    const token = createJWT({ payload: createTokenUser(result) });
    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { signIn };
