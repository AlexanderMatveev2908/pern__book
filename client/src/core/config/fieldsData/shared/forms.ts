import { capt } from "@/core/lib/lib";

export const addressFields_0 = ["country", "state", "city"].map((el) => ({
  field: el,
  label: capt(el),
}));
export const addressFields_1 = [
  "street",
  { field: "zipCode", label: "Zip Code" },
  "phone",
].map((el) =>
  typeof el === "object"
    ? el
    : {
        field: el,
        label: capt(el),
      }
);

export const addressFieldsByArea = [addressFields_0, addressFields_1];

export const qtyFieldItem = {
  field: "qty",
  place: "Qty books...",
};
