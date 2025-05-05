import { AssetCloudType } from "./images";

export enum UserRole {
  CUSTOMER = "CUSTOMER",
  EMPLOYEE = "EMPLOYEE",
  MANAGER = "MANAGER",
  OWNER = "OWNER",
}

export interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isNewsLetter: boolean;
  isVerified: boolean;
  role: UserRole;

  thumb: AssetCloudType | null;

  country: string | null;
  state: string | null;
  city: string | null;
  street: string | null;
  zipCode: string | null;
  phone: string | null;

  isOwner: boolean;
  isWorker: boolean;
  hasWorkers: boolean;
}

export interface AuthState {
  isLogged: boolean;
  canManageAccount: boolean;
  loggingOut: boolean;
  pushedOut: boolean;
}
