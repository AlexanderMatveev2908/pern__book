/* eslint-disable @typescript-eslint/no-explicit-any */
import BookStoreForm from "@/common/forms/BookStore/BookStoreForm";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import {
  useFocus,
  useScroll,
  useWrapMutationAPI,
  useWrapQueryAPI,
} from "@/core/hooks/hooks";
import { schemaBookStore } from "@/core/lib/all/forms/schemaZ/bookStore";
import {
  useGetBookStoreQuery,
  useUpdateBookStoreMutation,
} from "@/features/OwnerLayout/bookStoreSliceAPI";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { FormBookStoreType } from "../CreateBooksStore/CreateBooksStorePage";
import { useMakeSchemaXStore } from "@/core/hooks/all/forms/useMakeSchemaXStore";
import { __cg, isObjOk, logFormData } from "@/core/lib/lib";
import { handleFocusErrStore } from "@/core/lib/all/forms/errors/bookStore";
import { useFormSwap } from "@/core/hooks/all/forms/useSwapForm";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";
import {
  fieldsSwapStore,
  mandatoryKeysStore,
  optKeysStore,
} from "@/core/config/fieldsData/OwnerLayout/post";
import { BookStoreType } from "@/types/all/bookStore";
import { makeFormDataStore } from "@/core/lib/all/forms/formatters/bookStore";

const UpdateBookStore: FC = () => {
  useScroll();

  const { data: { user } = {} } = useGetUserProfileQuery() ?? {};
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

  useEffect(() => {
    const handleFill = () => {
      if (isObjOk(bookStore)) {
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
              if (Array.isArray(val)) {
                setValue(
                  key as keyof FormBookStoreType,
                  val.map((el) => el.url),
                  {
                    shouldValidate: true,
                  }
                );
              } else {
                setValue(key as keyof FormBookStoreType, val?.url ?? "", {
                  shouldValidate: true,
                });
              }
            } else {
              setValue(
                key as keyof FormBookStoreType,
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
      }
    };

    handleFill();
  }, [bookStore, setValue]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    handleSubmit(
      async (formDataHook) => {
        const formData = makeFormDataStore(formDataHook);

        logFormData(formData);

        wrapMutationAPI({
          cbAPI: () => mutate({ bookStoreID: bookStoreID!, formData }),
        });
      },
      (errs) => handleFocusErrStore(setFocus, errs, setCurrForm)
    )(e);
  };
  useFocus({ setFocus: formCtx.setFocus, key: "name" });

  return (
    <WrapPageAPI
      {...{
        canStay: user?.isVerified && itPass,
        isError: res?.isError,
        isLoading: res?.isLoading,
        error: res?.error,
      }}
    >
      <div className="parent__page">
        <Title {...{ title: "update bookstore" }} />

        <div className="w-full grid justify-items-center gap-6">
          <FormProvider {...formCtx}>
            <BookStoreForm {...{ isLoading, handleSave, isFormOk: true }} />
          </FormProvider>
        </div>
      </div>
    </WrapPageAPI>
  );
};

export default UpdateBookStore;
