import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { v4 } from "uuid";
import { KeyTypeRSA } from "../../types/all/keys.js";
import { schemaID } from "./utils/helpers.js";

export class KeyRSA extends Model<
  InferAttributes<KeyRSA>,
  InferCreationAttributes<KeyRSA>
> {
  id!: CreationOptional<string>;
  key!: string;
  type!: KeyTypeRSA;
}

export type KeyRSAInstance = InstanceType<typeof KeyRSA>;

export const definePairRSA = (seq: Sequelize) =>
  KeyRSA.init(
    {
      ...schemaID(),

      type: {
        type: DataTypes.ENUM(...Object.values(KeyTypeRSA)),
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
      tableName: "keys_rsa",
      modelName: "KeyRSA",
    }
  );
