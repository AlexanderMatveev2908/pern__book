import { DataTypes, Model } from "sequelize";
import { v4 } from "uuid";

export class CloudClass extends Model {
  id!: string;
  publicID!: string;
  url!: string;
}

export const makeSchemaCloud = () => ({
  id: {
    type: DataTypes.STRING(36),
    defaultValue: () => v4(),
    primaryKey: true,
    allowNull: false,
  },
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
