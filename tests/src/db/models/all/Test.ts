import { DataTypes, Model, Sequelize } from "sequelize";
import { schemaID } from "./helpers.js";

export class TestClass extends Model {
  id!: string;
}

export const defineTestClass = (seq: Sequelize) =>
  TestClass.init(
    {
      ...schemaID(),
    },
    {
      sequelize: seq,
      modelName: "Test",
      tableName: "tests",
      timestamps: true,
    }
  );
