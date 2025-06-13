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
  // ? actually after app has become multi store and has more complex relationships than a single user => role, this role prop has become pretty useless
  role: UserRole;

  thumb:
    | (AssetCloudType & {
        userID: string;
      })
    | null;

  country: string | null;
  state: string | null;
  city: string | null;
  street: string | null;
  zipCode: string | null;
  phone: string | null;

  // ? business flags
  isOwner: boolean;
  isWorker: boolean;
  hasWorkers: boolean;
  hasBusinessOrders: boolean;
  hasBooks: boolean;

  // ? consumer flags
  cartCount: number;
  hasConsumerOrders: boolean;
}

export interface AuthState {
  isLogged: boolean;
  canManageAccount: boolean;
  loggingOut: boolean;
  pushedOut: boolean;
}
