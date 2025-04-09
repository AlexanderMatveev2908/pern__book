export enum ROLE_USER {
  OWNER = "owner",
  MANAGER = "manager",
  EMPLOYEE = "employee",
  CUSTOMER = "customer",
}

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isNewsLetter: boolean;
  isVerified: boolean;
  role: ROLE_USER;
}

export interface AuthState {
  isLogged: boolean;
}
