/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchBar from "@/common/forms/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import {
  fieldsInputsBooksWorker,
  workerBooksFiltersBooks,
  workerNumericFieldsBooks,
  workerSortersBooks,
} from "@/core/config/fieldsData/SearchBar/worker/books";
import { REG_ID } from "@/core/config/regex";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useUpdateJoinCat } from "@/core/hooks/all/forms/books/useUpdateJoinCat";
import { __cg, decapt, isArr } from "@/core/lib/lib";
import { booksSliceWorkerAPI } from "@/features/WorkerLayout/Books/booksSliceWorkerAPI";
import { useEffect, useState, type FC } from "react";
import { FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
import BookItemWorker from "./components/BookItemWorker";
import BreadCrumb from "@/components/elements/BreadCrumb";

const BookListWorker: FC = () => {
  const [defVals, setDefVals] = useState<{ [key: string]: string[] }>({});

  const { formSearchBooksWorkerCtx: formCtx } = useFormCtxConsumer();
  const { handleSubmit, watch } = formCtx;
  const handleSave = handleSubmit(() => {
    __cg("submitted ✌🏼");
  });

  const storeID = useParams()?.bookStoreID;
  const canStay = REG_ID.test(storeID ?? "");

  const { innerJoinedCat, setInnerJoinedCat } = useSearchCtx();

  useUpdateJoinCat({
    watch,
    innerJoinedCat,
    setInnerJoinedCat,
  });

  const hook = booksSliceWorkerAPI.useLazyGetAllBooksWorkerQuery();
  const res = hook[1];
  const { data: { books } = {} } = res ?? {};

  useEffect(() => {
    if (isArr(books) && books?.[0]?.store?.categories?.length) {
      const cat = books![0]!.store!.categories;
      setDefVals({ mainCategories: cat });
    }
  }, [books, storeID]);

  return (
    <WrapPageAPI
      {...{
        canStay,
      }}
    >
      <BreadCrumb
        {...{
          els: [
            {
              label: decapt(
                ((books?.[0]?.store?.team as any)?.[0]?.bookStoreUser
                  ?.role as any) ?? "worker"
              ),
              path: "#",
            },
            {
              label: "books",
              path: "#",
            },
            {
              label: books?.[0]?.store?.name ?? "Book store",
              path: `/worker/book-stores/${storeID}`,
            },
          ],
        }}
      />

      <div className="p_page -mb-[175px]">
        <FormProvider {...formCtx}>
          <SearchBar
            {...{
              handleSave,
              hook,
              txtInputs: fieldsInputsBooksWorker,
              filters: workerBooksFiltersBooks,
              sorters: workerSortersBooks,
              numericFilters: workerNumericFieldsBooks,
              innerJoinCat: true,
              paramID: "bookStoreID",
              defVals,
            }}
          />
        </FormProvider>

        <WrapperContentAPI {...{ formCtx, hook, paramID: "bookStoreID" }}>
          <div className="p_cards">
            {isArr(books) &&
              books!.map((el) => <BookItemWorker key={el.id} {...{ el }} />)}
          </div>
        </WrapperContentAPI>
      </div>
    </WrapPageAPI>
  );
};

export default BookListWorker;
