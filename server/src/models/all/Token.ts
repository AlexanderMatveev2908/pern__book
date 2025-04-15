import { DataTypes, Sequelize } from "sequelize";
import { TokenEventType, TokenType } from "../../types/types.js";

const defineToken = (seq: Sequelize) =>
  seq.define<TokenType>(
    "Token",
    {
      type: {
        type: DataTypes.ENUM(...Object.values(TokenEventType)),
        allowNull: false,
      },
      hashed: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      expiry: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: null,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    { timestamps: true, tableName: "tokens" }
  );

export { defineToken };
