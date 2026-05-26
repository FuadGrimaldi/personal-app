const { DataTypes } = require("sequelize");
const { database } = require("../../../db/db");
const Mail = database.define(
  "mail",
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
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Menambahkan createdAt dan updatedAt
    freezeTableName: true, // Membekukan nama tabel agar tidak diubah menjadi bentuk jamak
  },
);

module.exports = Mail;
