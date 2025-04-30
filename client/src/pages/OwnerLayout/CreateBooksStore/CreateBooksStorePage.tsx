import BookStoreForm from "@/common/forms/BookStore/BookStoreForm";
import Title from "@/components/elements/Title";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { useFocus } from "@/core/hooks/hooks";
import { schemaBookStore } from "@/core/lib/all/forms/schemaZ/bookStore";
import { UserType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useFormSwap } from "@/core/hooks/all/forms/useSwapForm";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";
import { fieldsSwapStore } from "@/core/config/fieldsData/OwnerLayout/post";
import { handleFocusErrStore } from "@/core/lib/all/forms/errors/bookStore";
import { useListenFormOk } from "@/core/hooks/all/forms/useListenFormOk";
import { canSaveStore } from "@/core/lib/all/forms/preSubmit/bookStore";
import { makeFormDataStore } from "@/core/lib/all/forms/formatters/bookStore";
import { __cg, logFormData } from "@/core/lib/lib";

export type FormBookStoreType = z.infer<typeof schemaBookStore>;

const CreateBooksStore: FC = () => {
  const { data: { user } = {} } = (useGetUserProfileQuery() ??
    {}) as unknown as { data: { user: UserType } };

  const schemaX = schemaBookStore.and(z.object({})).superRefine((data, ctx) => {
    if (data.items?.length) {
      let i = 0;

      do {
        const curr = data.items[i];
        if (curr.email === user?.email) {
          ctx.addIssue({
            path: [`items.${i}.email`],
            message: "You can not hire yourself",
            code: "custom",
          });
          break;
        }

        i++;
      } while (i < data.items.length);
    }
  });

  const formCtx = useForm<FormBookStoreType>({
    resolver: zodResolver(schemaX),
    mode: "onChange",
    shouldFocusError: false,
    defaultValues: {
      categories: [],
    },
  });

  const {
    watch,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = formCtx;
  const { setCurrForm } = useFormSwap({
    ...useSwapCtxConsumer(),
    watch,
    errors,
    fields: fieldsSwapStore,
  });

  const vals = watch();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    handleSubmit(
      (data) => {
        __cg("data", data);
        const formData = makeFormDataStore(data);
        logFormData(formData);
      },
      (errs) => {
        handleFocusErrStore(setFocus, errs, setCurrForm);
      }
    )(e);
  };
  const { isFormOk } = useListenFormOk({
    errors,
    watch,
    customValidateCB: () => canSaveStore(vals),
  });
  useFocus({ setFocus: formCtx.setFocus, key: "name" });

  return (
    <div className="parent__page">
      <Title {...{ title: "create a bookstore" }} />
      <div className="w-full grid justify-items-center gap-6">
        <FormProvider {...formCtx}>
          <BookStoreForm {...{ handleSave, isFormOk }} />
        </FormProvider>
      </div>
    </div>
  );
};
export default CreateBooksStore;
