import { ImageCloudType } from "./images";

export enum UserRole {
  OWNER = "owner",
  MANAGER = "manager",
  EMPLOYEE = "employee",
  CUSTOMER = "customer",
}

export interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isNewsLetter: boolean;
  isVerified: boolean;
  role: UserRole;

  Thumb: ImageCloudType | null;

  country: string;
  state: string;
  street: string;
  zipCode: string;
  phone: string;
}

export interface AuthState {
  isLogged: boolean;
  loggingOut: boolean;
  pushedOut: boolean;
}
