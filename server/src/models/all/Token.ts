import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { TokenEventType } from "../../types/types.js";
import { v4 } from "uuid";
import { schemaID } from "./utils/helpers.js";

export class Token extends Model<
  InferAttributes<Token>,
  InferCreationAttributes<Token>
> {
  id!: CreationOptional<string>;
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
      userID: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize: seq,
      timestamps: true,
      tableName: "tokens",
      modelName: "Token",
    }
  );

export { defineToken };
