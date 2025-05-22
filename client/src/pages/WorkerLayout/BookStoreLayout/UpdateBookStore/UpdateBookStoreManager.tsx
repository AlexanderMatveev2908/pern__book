import BookStoreForm from "@/common/forms/BookStore/BookStoreForm";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useScroll, useWrapQueryAPI } from "@/core/hooks/hooks";
import { schemaBookStore } from "@/core/lib/all/forms/schemaZ/bookStore";
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
  useWrapQueryAPI({ ...res });

  const formCtx = useForm<UpdateStoreManagerFormType>({
    resolver: zodResolver(schemaBookStore),
    mode: "onChange",
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
            <BookStoreForm {...{}} />
          </FormProvider>
        </div>
      </div>
    </WrapPageAPI>
  );
};

export default UpdateBookStoreManager;
