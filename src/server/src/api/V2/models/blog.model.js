const { DataTypes } = require("sequelize");
const { database } = require("../../../db/db");

const Blog = database.define(
  "blog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "user", // nama tabel di database
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Menambahkan createdAt dan updatedAt
    tableName: "blog", // Nama tabel di database
  }
);

module.exports = Blog;
