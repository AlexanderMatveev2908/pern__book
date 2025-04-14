import { Model } from "sequelize";

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
