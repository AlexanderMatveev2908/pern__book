import { Token } from "../../models/models.js";
import { decodeExpJWT, PayloadJWT } from "../lib.js";

export const clearOldTokens = async (accessExp: string) => {
  const payload = decodeExpJWT(accessExp ?? "");
  await Token.destroy({
    where: { userID: (payload as PayloadJWT)?.id ?? "" },
  });
};
