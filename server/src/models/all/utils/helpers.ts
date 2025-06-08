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

export const schemaAddress = ({ allowNull }: { allowNull: boolean }) => ({
  country: {
    type: DataTypes.STRING,
    allowNull,
  },
  state: {
    type: DataTypes.STRING,
    allowNull,
  },
  city: {
    type: DataTypes.STRING,
    allowNull,
  },
  street: {
    type: DataTypes.STRING,
    allowNull,
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull,
  },
});
