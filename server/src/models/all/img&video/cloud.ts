import { Model } from "sequelize";

export class CloudClass extends Model {
  declare publicID: string;
  declare url: string;
}
