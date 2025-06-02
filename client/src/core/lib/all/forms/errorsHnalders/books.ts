import { UseFormSetFocus } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleErrsBooks = (errs: any, setFocus: UseFormSetFocus<any>) => {
  if (errs?.bookStoreID?.message) setFocus("bookStoreID_a" as any);
  else if (errs?.images?.message) setFocus("images_a" as any);
  else if (errs?.categories?.message) setFocus("categories_a" as any);
};
