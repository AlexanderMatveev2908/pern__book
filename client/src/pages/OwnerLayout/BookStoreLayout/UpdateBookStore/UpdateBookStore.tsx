/* eslint-disable @typescript-eslint/no-explicit-any */
import BookStoreForm from "@/common/forms/BookStore/BookStoreForm";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import {
  useFocus,
  useWrapMutationAPI,
  useWrapQueryAPI,
} from "@/core/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FormBookStoreType } from "../CreateBooksStore/CreateBooksStorePage";
import { useMakeSchemaXStore } from "@/core/hooks/all/forms/bookStore/useMakeSchemaXStore";
import { __cg, isSameData } from "@/core/lib/lib";
import { handleFocusErrStore } from "@/core/lib/all/forms/errors/bookStore";
import { useFormSwap } from "@/core/hooks/all/forms/useSwapForm";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";
import {
  fieldsSwapStore,
  mandatoryKeysStore,
  optKeysStore,
} from "@/core/config/fieldsData/OwnerLayout/bookStore/post";
import { BookStoreType } from "@/types/all/bookStore";
import { makeFormDataStore } from "@/core/lib/all/forms/formatters/bookStore";
import { useListenFormOk } from "@/core/hooks/all/forms/useListenFormOk";
import { useGetU } from "@/core/hooks/all/useGetU";
import {
  useGetBookStoreQuery,
  useUpdateBookStoreMutation,
} from "@/features/OwnerLayout/bookStores/bookStoreSliceAPI";
import { usePopulateStoreForm } from "@/core/hooks/all/forms/bookStore/usePopulateStoreForm";

const processTeam = (team: any[]) =>
  team?.length
    ? team.map((el: any) => ({ email: el.userEmail, role: el.role }))
    : [];

const processVideo = (video: any) => video?.url ?? null;

const processImages = (images: any[]) => images?.map((el: any) => el.url) ?? [];

const processPrice = (value: any) => {
  const numVal = +(value ?? "0");
  return numVal ? value : null;
};

const processNumberToString = (value: number) => {
  return value + "";
};

const UpdateBookStore: FC = () => {
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

    __cg("original", originalObj);
    __cg("vals", newVals);

    return !isSameData(originalObj, newVals);
  }, [vals, bookStore]);

  const { isFormOk } = useListenFormOk({
    watch,
    errors,
    customValidateCB: handleCheckEqData,
  });

  return (
    <WrapPageAPI
      {...{
        canStay: user?.isOwner && itPass,
        isError: res?.isError,
        isLoading: res?.isLoading,
        error: res?.error,
      }}
    >
      <Title {...{ title: "update bookstore" }} />

      <div className="w-full grid justify-items-center gap-6">
        <FormProvider {...formCtx}>
          <BookStoreForm {...{ isLoading, handleSave, isFormOk }} />
        </FormProvider>
      </div>
    </WrapPageAPI>
  );
};

export default UpdateBookStore;
