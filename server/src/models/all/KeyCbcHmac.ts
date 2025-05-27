import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { KeyTypeCbcHmac } from "../../types/all/keys.js";
import { v4 } from "uuid";
import { schemaID } from "./utils/helpers.js";

export class KeyCbcHmac extends Model<
  InferAttributes<KeyCbcHmac>,
  InferCreationAttributes<KeyCbcHmac>
> {
  id!: CreationOptional<string>;
  key!: string;
  type!: KeyTypeCbcHmac;
}

export type KeyCbcHmacInstance = InstanceType<typeof KeyCbcHmac>;

export const defineKeyCbcHmac = (seq: Sequelize) =>
  KeyCbcHmac.init(
    {
      ...schemaID(),

      type: {
        type: DataTypes.ENUM(...Object.values(KeyTypeCbcHmac)),
        allowNull: false,
      },
      key: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize: seq,
      timestamps: true,
      tableName: "keys_cbc_hmac",
      modelName: "KeyCbcHmac",
    }
  );
