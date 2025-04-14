import { Model } from "sequelize";

export enum TokenEventType {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
}

export interface TokenType extends Model {
  id: number;
  type: TokenEventType;
  hashed: string | null;
  expiry: string | null;
  userId: number;
}
