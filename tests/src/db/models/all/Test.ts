import { DataTypes, Model, Sequelize } from "sequelize";
import { seqID } from "./utils.js";

export class TestClass extends Model {
  id!: string;
}

export const defineTestClass = (seq: Sequelize) =>
  TestClass.init(
    {
      id: seqID(),
      num: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize: seq,
      modelName: "Test",
      tableName: "tests",
      timestamps: true,
    }
  );
