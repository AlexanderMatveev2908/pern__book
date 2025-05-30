import { BookStoreType } from "./bookStore";
import { UserRole } from "./user";

export type BookStoreUserType = {
  id: string;
  userID: string;
  userEmail: string;
  bookStoreID: string;
  bookStore: BookStoreType;
  role: UserRole;
};
