import { v4 } from "uuid";
import { fieldsActionsAuth } from "../general/fieldsActionsAuth";

export const fieldsHeaderDropNonLogged = fieldsActionsAuth.map((el) => ({
  ...el,
  id: v4(),
}));
