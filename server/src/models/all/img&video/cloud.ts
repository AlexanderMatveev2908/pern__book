import { DataTypes, Model } from "sequelize";
import { v4 } from "uuid";
import { schemaID } from "../utils/helpers.js";

export class CloudClass extends Model {
  id!: string;
  publicID!: string;
  url!: string;
}

export const makeSchemaCloud = () => ({
  ...schemaID(),
  publicID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
