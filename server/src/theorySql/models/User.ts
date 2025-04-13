import { DataTypes, Model } from "sequelize";
import seq from "../../config/db.js";
import { ProductType } from "./Product.js";

export interface UserType extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  Products?: ProductType[];
}

const User = seq.define<UserType>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default User;
