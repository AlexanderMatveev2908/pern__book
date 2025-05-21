import {
  AuthPagesPathType,
  fieldsActionsAuth,
  userLoggedFieldsDrop,
} from "../general/fieldsActionsAuth";
import { IconType } from "react-icons/lib";
import { addArrIDs } from "@/core/lib/all/utils/ids";

export interface DropFieldType {
  id?: string;
  label: string;
  path: AuthPagesPathType | string;
  icon: IconType;
}

export const fieldsHeaderDropNonLogged: DropFieldType[] =
  addArrIDs(fieldsActionsAuth);

export const fieldsHeaderDropLogged = addArrIDs(userLoggedFieldsDrop);
