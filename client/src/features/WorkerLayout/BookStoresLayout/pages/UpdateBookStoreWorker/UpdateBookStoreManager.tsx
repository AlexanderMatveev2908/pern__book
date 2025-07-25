/* eslint-disable @typescript-eslint/no-explicit-any */
import BookStoreForm from "@/common/forms/BookStore/BookStoreForm";
import BreadCrumb from "@/components/elements/BreadCrumb";
import Title from "@/components/elements/Title";
import WrapApp from "@/components/HOC/WrapApp";
import { REG_ID } from "@/core/config/regex";
import { usePopulateStoreForm } from "@/core/hooks/all/forms/bookStore/usePopulateStoreForm";
import { useListenFormOk } from "@/core/hooks/all/forms/useListenFormOk";
import { useWrapMutationAPI, useWrapQueryAPI } from "@/core/hooks/hooks";
import { makeFormDataStore } from "@/core/lib/all/forms/processVals/bookStore";
import { schemaBookStore } from "@/core/lib/all/forms/schemaZ/bookStore";
import { isObjOk, isSameData } from "@/core/lib/lib";
import { bookStoresWorkerSliceAPI } from "@/features/WorkerLayout/BookStoresLayout/bookStoresWorkerSliceAPI";
import { AssetCloudType, UserRole } from "@/types/types";
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

  const res: any = bookStoresWorkerSliceAPI.useGetSingleStoreWorkerQuery(
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
                ? bookStore?.images?.map((img: AssetCloudType) => img.url)
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
    <WrapApp
      {...{
        canStay: validID && role === UserRole.MANAGER,
        ...res,
        isSuccess: isObjOk(bookStore),
      }}
    >
      {() => (
        <>
          <BreadCrumb
            {...{
              els: [
                {
                  label: "manager",
                  path: "#",
                },
                {
                  label: "book stores",
                  path: "/worker/book-stores/list",
                },
                {
                  label: "update book store",
                  path: "#",
                },
              ],
            }}
          />

          <Title {...{ title: "update bookstore" }} />

          <div className="w-full grid justify-items-center gap-6">
            <FormProvider {...formCtx}>
              <BookStoreForm
                {...{ handleSave, role: UserRole.MANAGER, isLoading, isFormOk }}
              />
            </FormProvider>
          </div>
        </>
      )}
    </WrapApp>
  );
};

export default UpdateBookStoreManager;
