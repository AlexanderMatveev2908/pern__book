import { DataTypes } from "sequelize";
import { v4 } from "uuid";

export const schemaID = (allowNull?: boolean) => ({
  id: {
    type: DataTypes.STRING(36),
    defaultValue: () => v4(),
    primaryKey: true,
    allowNull: allowNull ?? false,
  },
});

export const refSql = (
  model: string,
  { allowNull }: { allowNull?: boolean } = {}
) => ({
  type: DataTypes.STRING(36),
  allowNull: allowNull ?? false,
  references: {
    model,
    key: "id",
  },
});
