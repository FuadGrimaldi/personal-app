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

module.exports = {
  getAll,
};
