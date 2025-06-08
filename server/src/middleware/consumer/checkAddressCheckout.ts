import { handleValidator } from "../../lib/middleware/handleValidator.js";
import { validateAddress } from "../sharedValidators/address.js";

export const checkAddressCheckout = [
  ...validateAddress(),
  handleValidator(422),
];
