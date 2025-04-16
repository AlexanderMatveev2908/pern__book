import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { v4 } from "uuid";
import { KeyType } from "../../types/all/keys.js";
import { KeyAlg, KeyAlgType } from "../../types/types.js";

export class Key extends Model<
  InferAttributes<Key>,
  InferCreationAttributes<Key>
> {
  declare id: CreationOptional<string>;
  declare key: string;
  declare type: KeyType;
  declare alg: KeyAlgType;
}

export type KeyInstance = InstanceType<typeof Key>;

export const defineKey = (seq: Sequelize) =>
  Key.init(
    {
      id: {
        type: DataTypes.STRING(36),
        defaultValue: () => v4(),
        primaryKey: true,
        allowNull: false,
      },
      alg: {
        type: DataTypes.ENUM(...Object.values(KeyAlg)),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(...Object.values(KeyType)),
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
      tableName: "keys",
      modelName: "Key",
    }
  );
