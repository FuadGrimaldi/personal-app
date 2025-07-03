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
    throw error;
  }
};

const signUp = async (req) => {
  try {
    const existingUser = await User.findOne({ email: req.email });
    if (existingUser) {
      throw new BadRequesError("Email is already in use");
    }

    const newUser = new User(req);
    await newUser.save();

    const userObj = newUser.toObject();
    delete userObj.password;

    return userObj;
  } catch (error) {
    throw new BadRequesError("Failed to create user");
  }
};

module.exports = { signIn, signUp };
