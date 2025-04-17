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
}

export interface AuthState {
  isLogged: boolean;
  test: string;
}
