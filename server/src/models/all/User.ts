import { DataTypes, Model } from "sequelize";
import seq from "../../config/db.js";

export enum UserRole {
  OWNER = "OWNER",
  MANAGER = "MANAGER",
  EMPLOYEE = "EMPLOYEE",
  CUSTOMER = "CUSTOMER",
}

export interface UserType extends Model {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  tempEmail: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  isNewsletter: boolean;
  createdAt: string;
  updatedAt: string;
}

const User = seq.define<UserType>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    tableName: "users",
    timestamps: true,
  }
);

export default User;
