/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  mandatoryKeysStore,
  optKeysStore,
} from "@/core/config/fieldsData/bookStores/forms";
import { isObjOk } from "@/core/lib/lib";
import { FormBookStoreType } from "@/features/OwnerLayout/BookStoresLayout/pages/CreateBooksStoreOwner/CreateBooksStoreOwner";
import { BookStoreType } from "@/types/all/bookStore";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

type Params = {
  bookStore?: BookStoreType;
  setValue: UseFormSetValue<any>;
};

export const usePopulateStoreForm = ({ bookStore, setValue }: Params) => {
  useEffect(() => {
    const handleFill = () => {
      if (!isObjOk(bookStore)) return;

      for (const key in bookStore) {
        const val = (bookStore as any)[key as keyof BookStoreType];

        if (mandatoryKeysStore.includes(key)) {
          setValue(
            key as keyof FormBookStoreType,
            typeof val === "number" ? +val + "" : val,
            {
              shouldValidate: true,
            }
          );
        } else if (optKeysStore.includes(key)) {
          if (typeof val === "object") {
            if (key === "video") {
              setValue(key as keyof FormBookStoreType, val?.url ?? null, {
                shouldValidate: true,
              });
            } else if (Array.isArray(val)) {
              setValue(
                key as keyof FormBookStoreType,
                val.map((el) => el.url),
                {
                  shouldValidate: true,
                }
              );
            }
          } else {
            setValue(
              key as keyof FormBookStoreType,
              // ? if NaN just txt, if val > 0 num else leave empty
              isNaN(val) ? val : +val ? val : "",
              {
                shouldValidate: true,
              }
            );
          }
        } else if (key === "team") {
          const hasData =
            Array.isArray(val) &&
            val.length &&
            val.every((member) => isObjOk(member));

          setValue(
            "items",
            hasData
              ? val.map((el) => ({
                  email: el.userEmail,
                  role: el.role,
                }))
              : [
                  {
                    email: "",
                    role: null,
                  },
                ]
          );
        }
      }
    };

    handleFill();
  }, [bookStore, setValue]);

  return {};
};
