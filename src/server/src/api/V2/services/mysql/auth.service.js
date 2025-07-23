const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const { BadRequesError, UnauthorizedError } = require("../../../../errors");
const { createJWT } = require("../../../../middlewares/jwt");
const { createTokenUser } = require("../../../../helpers/createToken");

const signIn = async (req) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new BadRequesError("please provide email and password");

    const result = await User.findOne({
      where: { email: email },
    });

    if (!result) throw new UnauthorizedError("Invalid Credentials");

    const isPasswordCorrect = await result.comparePassword(password);
    if (!isPasswordCorrect) throw new UnauthorizedError("Invalid Credentials");

    const token = createJWT({ payload: createTokenUser(result) });
    return token;
  } catch (error) {
    throw error;
  }
};

const signUp = async (body) => {
  try {
    const {
      email,
      username,
      name,
      password,
      confirmPassword, // tambahkan ini jika diperlukan
      roles, // sesuaikan dengan data yang dikirim (roles bukan role)
      age,
      phone,
      job,
      country,
      province,
      city,
      address_details,
      description,
    } = body;

    // Validasi password confirmation
    if (password !== confirmPassword) {
      throw new BadRequesError("Password and confirm password do not match");
    }

    // Validasi input required
    if (
      !email ||
      !username ||
      !name ||
      !password ||
      !age ||
      !phone ||
      !job ||
      !country ||
      !province ||
      !city ||
      !address_details
    ) {
      throw new BadRequesError("All required fields must be provided");
    }

    // Cek email sudah ada atau belum
    const existingUser = await User.findOne({
      where: { email: email },
    });

    if (existingUser) {
      throw new BadRequesError("Email is already in use");
    }

    // Cek username sudah ada atau belum
    const existingUsername = await User.findOne({
      where: { username: username },
    });

    if (existingUsername) {
      throw new BadRequesError("Username is already in use");
    }

    // Konversi age ke integer jika string
    const userAge = typeof age === "string" ? parseInt(age) : age;

    // Buat user baru
    const newUser = await User.create({
      email,
      username,
      name,
      password,
      age: userAge,
      phone,
      job,
      country,
      province,
      city,
      address_details,
      description: description || null,
      role: roles || "user", // gunakan roles dari request atau default "user"
    });

    // Return user tanpa password
    const userObj = newUser.toJSON();
    delete userObj.password;

    return userObj;
  } catch (error) {
    console.error("SignUp service error:", error);

    // Jika error dari Sequelize validation
    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((err) => err.message);
      throw new BadRequesError(messages.join(", "));
    }

    // Jika error unique constraint
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new BadRequesError("Email or username already exists");
    }

    throw error;
  }
};

module.exports = { signIn, signUp };
