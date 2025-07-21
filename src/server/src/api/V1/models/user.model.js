const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const usersSchema = new Schema(
  {
    // acount
    username: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 6,
    },
    // avatar
    avatar: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: false,
    },
    // profile
    name: {
      type: String,
      required: [true, "name is required"],
    },
    age: {
      type: Number,
      required: [true, "age is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    job: {
      type: String,
      required: [true, "job is required"],
    },
    roles: {
      type: String,
      required: [true, "roles is required"],
    },

    // address
    country: {
      type: String,
      required: [true, "country is required"],
    },
    province: {
      type: String,
      required: [true, "province is required"],
    },
    city: {
      type: String,
      required: [true, "city is required"],
    },
    address_details: {
      type: String,
      required: [true, "address details is required"],
    },
    // description
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

usersSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

usersSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", usersSchema);
