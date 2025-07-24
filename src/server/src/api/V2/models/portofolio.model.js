const { DataTypes } = require("sequelize");
const { database } = require("../../../db/db");

const Portofolio = database.define(
  "portofolio",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "user", // nama tabel di database
        key: "id",
      },
    },
  },
  {
    timestamps: true, // Menambahkan createdAt dan updatedAt
    tableName: "portofolio", // Nama tabel di database
  }
);

module.exports = Portofolio;
