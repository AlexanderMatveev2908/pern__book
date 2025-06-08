import { schemaAddress } from "@/core/lib/all/forms/schemaZ/address";
import { z } from "zod";

export const schemaCheckoutAddress = z.object({
  ...schemaAddress(),
});

export type CheckoutAddressType = z.infer<typeof schemaCheckoutAddress>;
