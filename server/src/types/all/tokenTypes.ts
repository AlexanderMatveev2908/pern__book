import { Model } from "sequelize";

export enum TokenEventType {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
  VERIFY_ACCOUNT = "VERIFY_ACCOUNT",
  FORGOT_PWD = "FORGOT_PWD",
  CHANGE_PWD = "CHANGE_PWD",
  CHANGE_EMAIL = "CHANGE_EMAIL",
}

export interface TokenType extends Model {
  id: number;
  type: TokenEventType;
  hashed: string | null;
  expiry: number | null;
  userId: number;
}
