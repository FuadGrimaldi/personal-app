const { DataTypes } = require("sequelize");
const { database } = require("../../../db/db");

const Image = database.define(
  "image",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add any additional fields as needed
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Image;
