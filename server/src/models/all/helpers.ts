import { DataTypes } from "sequelize";
import { v4 } from "uuid";

export const schemaID = () => ({
  id: {
    type: DataTypes.STRING(36),
    defaultValue: () => v4(),
    primaryKey: true,
    allowNull: false,
  },
});
