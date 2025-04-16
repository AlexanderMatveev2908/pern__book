import { DataTypes, Model, Sequelize } from "sequelize";
import { UserRole } from "../../types/types.js";
import pkg from "bson-objectid";
import { v4 } from "uuid";

const ObjectID = pkg.default;

export class User extends Model {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  tempEmail!: string | null;
  password!: string;
  role!: UserRole;
  isVerified!: boolean;
  isNewsletter!: boolean;
}

export type UserInstance = InstanceType<typeof User>;

const defineUser = (seq: Sequelize) =>
  User.init(
    {
      id: {
        type: DataTypes.STRING(36),
        defaultValue: () => v4(),
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      tempEmail: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(...Object.values(UserRole)),
        allowNull: false,
        defaultValue: UserRole.CUSTOMER,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isNewsletter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize: seq,
      tableName: "users",
      timestamps: true,
      modelName: "User",
    }
  );

export { defineUser };
