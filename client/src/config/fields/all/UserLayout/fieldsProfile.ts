import { v4 } from "uuid";
import { namesFields } from "../general/userFields";

export const fieldsProfileHeader = [...namesFields].map((el) => ({
  ...el,
  id: v4(),
}));
