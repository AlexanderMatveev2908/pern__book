import BookStoreForm from "@/common/forms/BookStore/BookStoreForm";
import Title from "@/components/elements/Title";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { useFocus, useWrapMutationAPI } from "@/core/hooks/hooks";
import { schemaBookStore } from "@/core/lib/all/forms/schemaZ/bookStore";
import { UserType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useFormSwap } from "@/core/hooks/all/forms/useSwapForm";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";
import { fieldsSwapStore } from "@/core/config/fieldsData/OwnerLayout/post";
import { handleFocusErrStore } from "@/core/lib/all/forms/errors/bookStore";
import { makeFormDataStore } from "@/core/lib/all/forms/formatters/bookStore";
import { __cg } from "@/core/lib/lib";
import { useCreateBookStoreMutation } from "@/features/OwnerLayout/bookStoreSliceAPI";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { doLorem } from "@/core/lib/all/utils/place";
import { useNavigate } from "react-router-dom";
import { useMakeSchemaXStore } from "@/core/hooks/all/forms/useMakeSchemaXStore";

export type FormBookStoreType = z.infer<typeof schemaBookStore>;

const CreateBooksStore: FC = () => {
  const nav = useNavigate();
  const { data: { user } = {} } = (useGetUserProfileQuery() ??
    {}) as unknown as { data: { user: UserType } };

  const [createBookStore, { isLoading }] = useCreateBookStoreMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const schemaX = useMakeSchemaXStore();
  const formCtx = useForm<FormBookStoreType>({
    resolver: zodResolver(schemaX),
    mode: "onChange",
    shouldFocusError: false,
    defaultValues: {
      categories: [],
      description: doLorem(),
    },
  });

  const {
    watch,
    formState: { errors },
    handleSubmit,
    setFocus,
    reset,
    setValue,
  } = formCtx;
  const { setCurrForm } = useFormSwap({
    ...useSwapCtxConsumer(),
    watch,
    errors,
    fields: fieldsSwapStore,
  });

  // const vals = watch();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    handleSubmit(
      async (data) => {
        __cg("data", data);
        const formData = makeFormDataStore(data);

        const res = await wrapMutationAPI({
          cbAPI: () => createBookStore(formData),
        });

        if (!res) return;

        reset();
        nav(`/owner/book-store/${res.bookStoreID}`);
      },
      async (errs) => {
        await handleFocusErrStore(setFocus, errs, setCurrForm);
      }
    )(e);
  };
  // const { isFormOk } = useListenFormOk({
  //   errors,
  //   watch,
  //   customValidateCB: () => canSaveStore(vals),
  // });
  useFocus({ setFocus: formCtx.setFocus, key: "name" });

  useEffect(() => {
    setValue("items", [
      {
        email: "",
        role: null,
      },
    ]);
  }, [setValue]);
  return (
    <WrapPageAPI {...{ canStay: user?.isVerified }}>
      <div className="parent__page">
        <Title {...{ title: "create a bookstore" }} />
        <div className="w-full grid justify-items-center gap-6">
          <FormProvider {...formCtx}>
            <BookStoreForm {...{ handleSave, isFormOk: true, isLoading }} />
          </FormProvider>
        </div>
      </div>
    </WrapPageAPI>
  );
};
export default CreateBooksStore;
