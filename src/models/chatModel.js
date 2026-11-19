const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db-config/sql-connection");

const Chat = sequelize.define(
  "Chat",
  {
    chatId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    userAId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    userBId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "chats",
    timestamps: true,
  }
);

module.exports = Chat;