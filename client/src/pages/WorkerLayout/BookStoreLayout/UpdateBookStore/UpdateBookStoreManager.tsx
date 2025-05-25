/* eslint-disable @typescript-eslint/no-explicit-any */
import BookStoreForm from "@/common/forms/BookStore/BookStoreForm";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { usePopulateStoreForm } from "@/core/hooks/all/forms/bookStore/usePopulateStoreForm";
import { useListenFormOk } from "@/core/hooks/all/forms/useListenFormOk";
import { useWrapMutationAPI, useWrapQueryAPI } from "@/core/hooks/hooks";
import { makeFormDataStore } from "@/core/lib/all/forms/formatters/bookStore";
import { schemaBookStore } from "@/core/lib/all/forms/schemaZ/bookStore";
import { isObjOk, isSameData } from "@/core/lib/lib";
import { bookStoresWorkerSliceAPI } from "@/features/WorkerLayout/BookStores/bookStoresWorkerSliceAPI";
import { UserRole } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, type FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

type UpdateStoreManagerFormType = z.infer<typeof schemaBookStore>;

const UpdateBookStoreManager: FC = () => {
  const nav = useNavigate();

  const bookStoreID = useParams()?.bookStoreID;
  const validID = REG_ID.test(bookStoreID!);

  const res = bookStoresWorkerSliceAPI.useGetSingleStoreWorkerQuery(
    { bookStoreID: bookStoreID!, roles: [UserRole.MANAGER] },
    {
      skip: !validID,
    }
  );
  const { data: { bookStore } = {} } = res;
  useWrapQueryAPI({ ...res });

  const [{ bookStoreUser: { role } = {} } = {}] =
    bookStore?.team ?? ([] as any);

  const [mutate, { isLoading }] =
    bookStoresWorkerSliceAPI.useUpdateBookStoreWorkerMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const formCtx = useForm<UpdateStoreManagerFormType>({
    resolver: zodResolver(schemaBookStore),
    mode: "onChange",
  });
  const {
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
    watch,
  } = formCtx;
  const handleSave = handleSubmit(
    async (formDataHook) => {
      const formData = makeFormDataStore(formDataHook);

      const res = await wrapMutationAPI({
        cbAPI: () => mutate({ bookStoreID: bookStoreID!, formData }),
      });

      if (!res) return;

      nav(`/worker/book-stores/${bookStoreID}`);
    },
    (errs) => {
      if (errs?.video?.message) setFocus("video_a" as any);
      else if (errs?.images?.message) setFocus("images_a" as any);

      return errs;
    }
  );

  usePopulateStoreForm({
    setValue,
    bookStore: bookStore,
  });

  const checkEq = useCallback(
    (vals: any) => {
      const keysToCheck = [
        "description",
        "images",
        "video",
        "deliveryPrice",
        "deliveryTime",
        "freeDeliveryAmount",
      ];

      const original: any = {};
      const currVals: any = {};

      for (const k of keysToCheck) {
        switch (k) {
          case "description": {
            original[k] = bookStore?.[k] || null;
            currVals[k] = vals[k] || null;
            break;
          }

          case "images": {
            original[k] =
              Array.isArray(bookStore?.[k]) && bookStore?.[k]?.length
                ? bookStore?.images?.map((img) => img.url)
                : null;
            currVals[k] = vals?.[k]?.length ? vals[k] : null;
            break;
          }

          case "video": {
            original[k] = isObjOk(bookStore?.[k]) ? bookStore?.[k]?.url : null;
            currVals[k] = isObjOk(vals[k]) ? vals[k] : null;
            break;
          }

          case "deliveryPrice":
          case "deliveryTime":
          case "freeDeliveryAmount": {
            original[k] = +(bookStore?.[k] ?? 0) ? +bookStore![k]! : null;
            currVals[k] = +(vals[k] ?? 0) ? +vals![k]! : null;
            break;
          }

          default:
            break;
        }
      }

      return !isSameData(original, currVals);
    },
    [bookStore]
  );

  const { isFormOk } = useListenFormOk({
    errors,
    watch,
    customValidateCB: checkEq,
  });

  return (
    <WrapPageAPI
      {...{
        canStay: validID && role === UserRole.MANAGER,
        isLoading: res.isLoading,
        isError: res.isError,
        error: res.error,
      }}
    >
      <Title {...{ title: "update bookstore" }} />

      <div className="w-full grid justify-items-center gap-6">
        <FormProvider {...formCtx}>
          <BookStoreForm
            {...{ handleSave, isManager: true, isLoading, isFormOk }}
          />
        </FormProvider>
      </div>
    </WrapPageAPI>
  );
};

export default UpdateBookStoreManager;
