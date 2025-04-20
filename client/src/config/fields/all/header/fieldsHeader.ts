import { v4 } from "uuid";
import {
  AuthPagesPathType,
  fieldsActionsAuth,
} from "../general/fieldsActionsAuth";
import { IconType } from "react-icons/lib";
import { userLoggedFieldsDrop } from "../general/userFields";

export interface DropFieldType {
  id?: string;
  label: string;
  path: AuthPagesPathType | string;
  icon: IconType;
}

export const fieldsHeaderDropNonLogged: DropFieldType[] = fieldsActionsAuth.map(
  (el) => ({
    ...el,
    id: v4(),
  })
);

export const fieldsHeaderDropLogged = [...userLoggedFieldsDrop].map((el) => ({
  ...el,
  id: v4(),
})) as DropFieldType[];
