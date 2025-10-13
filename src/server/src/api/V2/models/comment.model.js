const { DataTypes } = require("sequelize");
const { database } = require("../../../db/db");
const portofolio = require("./portofolio.model");

const Comment = database.define(
  "comment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_porto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "portofolio", // nama tabel di database
        key: "id",
      },
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Add any additional fields as needed
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Comment.belongsTo(portofolio, {
  foreignKey: "id_porto",
  as: "portofolio",
});

module.exports = Comment;
