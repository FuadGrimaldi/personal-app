const User = require("../../models/user.model");
const { BadRequesError } = require("../../../../errors");

const getAll = async (req) => {
  try {
    const result = await User.find();
    return result;
  } catch (error) {
    throw new BadRequesError("Failed to retrieve users");
  }
};

const createUser = async (req) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new BadRequesError("Email is already in use");
    }

    const newUser = new User(userData);
    await newUser.save();

    const userObj = newUser.toObject();
    delete userObj.password;

    return userObj;
  } catch (error) {
    throw new BadRequesError("Failed to create user");
  }
};

module.exports = {
  getAll,
  createUser,
};
