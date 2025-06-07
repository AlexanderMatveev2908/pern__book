import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { TokenEventType } from "../../types/types.js";
import { refSql, schemaID } from "./utils/helpers.js";

export class Token extends Model {
  id!: string;
  event!: TokenEventType;
  hashed!: string;
  expiry!: number;
  userID!: string;
}

export type TokenInstance = InstanceType<typeof Token>;

const defineToken = (seq: Sequelize) =>
  Token.init(
    {
      ...schemaID(),
      event: {
        type: DataTypes.ENUM(...Object.values(TokenEventType)),
        allowNull: false,
      },
      hashed: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      expiry: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: null,
      },
      userID: refSql("users"),
    },
    {
      sequelize: seq,
      timestamps: true,
      tableName: "tokens",
      modelName: "Token",
    }
  );

export { defineToken };
