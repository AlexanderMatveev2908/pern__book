/* eslint-disable @typescript-eslint/no-explicit-any */
import { REG_ID } from "@/core/config/regex";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useCallback, useMemo, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBookStoreQuery,
  useUpdateBookStoreMutation,
} from "../../bookStoreSliceAPI";
import {
  useFocus,
  useWrapMutationAPI,
  useWrapQueryAPI,
} from "@/core/hooks/hooks";
import { useMakeSchemaXStore } from "@/core/hooks/all/forms/bookStore/useMakeSchemaXStore";
import { FormBookStoreType } from "../CreateBooksStoreOwner/CreateBooksStoreOwner";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";
import {
  fieldsSwapStore,
  mandatoryKeysStore,
  optKeysStore,
} from "@/core/config/fieldsData/bookStores/forms";
import { usePopulateStoreForm } from "@/core/hooks/all/forms/bookStore/usePopulateStoreForm";
import { makeFormDataStore } from "@/core/lib/all/forms/processVals/bookStore";
import { handleFocusErrStore } from "@/core/lib/all/forms/errPostSubmit/bookStore";
import { BookStoreType } from "@/types/all/bookStore";
import {
  processImages,
  processNumberToString,
  processPrice,
  processTeam,
  processVideo,
} from "./utils";
import { isObjOk, isSameData } from "@/core/lib/lib";
import { useListenFormOk } from "@/core/hooks/all/forms/useListenFormOk";
import BreadCrumb from "@/components/elements/BreadCrumb";
import Title from "@/components/elements/Title";
import BookStoreForm from "@/common/forms/BookStore/BookStoreForm";
import { UserRole } from "@/types/types";
import WrapApp from "@/components/HOC/WrapApp";
import { useFormSwap } from "@/core/contexts/SwapCtx/ctx/hooks/useSwapForm";

const UpdateBookStoreOwner: FC = () => {
  const nav = useNavigate();

  const { user } = useGetU();
  const { bookStoreID } = useParams() ?? {};
  const itPass = useMemo(() => REG_ID.test(bookStoreID ?? ""), [bookStoreID]);
  const res = useGetBookStoreQuery(bookStoreID!, {
    skip: !itPass,
  });
  useWrapQueryAPI({ ...res });
  const { data: { bookStore } = {} } = res ?? {};

  const [mutate, { isLoading }] = useUpdateBookStoreMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const schemaX = useMakeSchemaXStore();
  const formCtx = useForm<FormBookStoreType>({
    resolver: zodResolver(schemaX),
    mode: "onChange",
    shouldFocusError: false,
  });

  const {
    handleSubmit,
    setFocus,
    watch,
    setValue,
    formState: { errors },
  } = formCtx;
  const { setCurrForm } = useFormSwap({
    ...useSwapCtxConsumer(),
    watch,
    errors,
    fields: fieldsSwapStore,
  });

  usePopulateStoreForm({
    bookStore,
    setValue,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    handleSubmit(
      async (formDataHook) => {
        const formData = makeFormDataStore(formDataHook);

        const res = await wrapMutationAPI({
          cbAPI: () => mutate({ bookStoreID: bookStoreID!, formData }),
        });

        if (!res) return;

        // reset({
        //   items: [
        //     {
        //       email: "",
        //       role: null,
        //     },
        //   ],
        // });

        nav(`/owner/book-store/${bookStoreID}`, { replace: true });
      },
      async (errs) => await handleFocusErrStore(setFocus, errs, setCurrForm)
    )(e);
  };
  useFocus({ setFocus: formCtx.setFocus, key: "name" });

  const vals = watch();
  const handleCheckEqData = useCallback(() => {
    const originalObj = [...mandatoryKeysStore, ...optKeysStore, "team"].reduce(
      (acc: any, curr) => {
        const val: any = bookStore?.[curr as keyof BookStoreType];

        switch (curr) {
          case "team":
            acc[curr] = processTeam(val);
            break;
          case "video":
            acc[curr] = processVideo(val);
            break;
          case "images":
            acc[curr] = processImages(val);
            break;
          case "deliveryPrice":
          case "freeDeliveryAmount":
            acc[curr] = processPrice(val);
            break;
          default:
            acc[curr] =
              typeof val === "number" ? processNumberToString(val) : val;
            break;
        }

        return acc;
      },
      {}
    );

    const newVals = [...mandatoryKeysStore, ...optKeysStore, "items"].reduce(
      (acc: any, curr) => {
        const val = vals?.[curr as keyof FormBookStoreType];

        if (curr === "items")
          acc.team = Object.values(val?.[0] ?? {}).every((val) => !!val)
            ? val
            : [];
        else acc[curr] = val || null;

        return acc;
      },
      {}
    );

    return !isSameData(originalObj, newVals);
  }, [vals, bookStore]);

  const { isFormOk } = useListenFormOk({
    watch,
    errors,
    customValidateCB: handleCheckEqData,
  });

  return (
    <WrapApp
      {...{
        canStay: user?.isOwner && itPass,
        ...res,
        isSuccess: isObjOk(bookStore),
      }}
    >
      {() => (
        <>
          <BreadCrumb
            {...{
              els: [
                { label: "admin", path: "#" },
                { label: "Book Stores", path: "/owner/book-store/book-stores" },
                { label: "update", path: "#" },
              ],
            }}
          />

          <Title {...{ title: "update bookstore" }} />

          <div className="w-full grid justify-items-center gap-6">
            <FormProvider {...formCtx}>
              <BookStoreForm
                {...{ isLoading, handleSave, isFormOk, role: UserRole.OWNER }}
              />
            </FormProvider>
          </div>
        </>
      )}
    </WrapApp>
  );
};

export default UpdateBookStoreOwner;
