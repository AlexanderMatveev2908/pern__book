import { DataTypes, Model } from "sequelize";
import seq from "../../config/db.js";

export enum TokenEventType {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
}

export interface TokenType extends Model {
  id: number;
  type: TokenEventType;
  hashed: string | null;
  expiry: string | null;
  userId: number;
}

const Token = seq.define<TokenType>(
  "Token",
  {
    type: {
      type: DataTypes.ENUM(...Object.values(TokenEventType)),
      allowNull: false,
    },
    hashed: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    expiry: {
      type: DataTypes.DATE,
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

export default Token;
