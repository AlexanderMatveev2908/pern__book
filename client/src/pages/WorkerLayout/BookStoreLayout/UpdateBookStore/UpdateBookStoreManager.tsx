import BookStoreForm from "@/common/forms/BookStore/BookStoreForm";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { usePopulateStoreForm } from "@/core/hooks/all/forms/bookStore/usePopulateStoreForm";
import { useScroll, useWrapQueryAPI } from "@/core/hooks/hooks";
import { schemaBookStore } from "@/core/lib/all/forms/schemaZ/bookStore";
import { __cg } from "@/core/lib/lib";
import { bookStoresWorkerSliceAPI } from "@/features/WorkerLayout/BookStores/bookStoresWorkerSliceAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

type UpdateStoreManagerFormType = z.infer<typeof schemaBookStore>;

const UpdateBookStoreManager: FC = () => {
  useScroll();

  const bookStoreID = useParams()?.bookStoreID;
  const validID = REG_ID.test(bookStoreID!);

  const res = bookStoresWorkerSliceAPI.useGetSingleStoreWorkerQuery(
    bookStoreID!,
    {
      skip: !validID,
    }
  );
  const { data: { bookStore } = {} } = res;
  useWrapQueryAPI({ ...res });

  const formCtx = useForm<UpdateStoreManagerFormType>({
    resolver: zodResolver(schemaBookStore),
    mode: "onChange",
  });
  const { handleSubmit, setValue } = formCtx;
  const handleSave = handleSubmit((formDataHook) => {
    __cg("submitted", formDataHook);
  });

  usePopulateStoreForm({
    setValue,
    bookStore: bookStore,
  });

  return (
    <WrapPageAPI
      {...{
        canStay: validID,
        isLoading: res.isLoading,
        isError: res.isError,
        error: res.error,
      }}
    >
      <div className="parent__page">
        <Title {...{ title: "update bookstore" }} />

        <div className="w-full grid justify-items-center gap-6">
          <FormProvider {...formCtx}>
            <BookStoreForm {...{ handleSave, isManager: true }} />
          </FormProvider>
        </div>
      </div>
    </WrapPageAPI>
  );
};

export default UpdateBookStoreManager;
