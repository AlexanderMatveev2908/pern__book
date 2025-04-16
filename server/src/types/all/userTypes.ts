import { Model } from "sequelize";

export enum UserRole {
  CUSTOMER = "CUSTOMER",
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
  OWNER = "OWNER",
}
