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

export class Token extends Model<
  InferAttributes<Token>,
  InferCreationAttributes<Token>
> {
  declare id: CreationOptional<string>;
  declare event: TokenEventType;
  declare hashed: string;
  declare expiry: number;
  declare userID: string;
}

export type TokenInstance = InstanceType<typeof Token>;

const defineToken = (seq: Sequelize) =>
  Token.init(
    {
      id: {
        type: DataTypes.STRING(36),
        defaultValue: () => v4(),
        primaryKey: true,
        allowNull: false,
      },
      event: {
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
