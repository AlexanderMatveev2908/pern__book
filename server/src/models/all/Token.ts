import { Model } from "sequelize";
import { TokenEventType } from "../../types/types.js";

export interface TokenType extends Model {
  id: number;
  type: TokenEventType;
  hashed: string | null;
  expiry: number | null;
  userId: number;
}
