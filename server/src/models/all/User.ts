import { Model } from "sequelize";

export enum UserRole {
  CUSTOMER = "CUSTOMER",
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
  OWNER = "OWNER",
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
