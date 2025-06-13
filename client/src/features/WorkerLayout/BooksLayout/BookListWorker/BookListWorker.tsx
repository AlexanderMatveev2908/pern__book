/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchBar from "@/common/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import {
  fieldsInputsBooksWorker,
  workerBooksFiltersBooks,
  workerNumericFieldsBooks,
  workerSortersBooks,
} from "@/features/common/SearchBar/fields/worker/books";
import { REG_ID } from "@/core/config/regex";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useUpdateJoinCatMount } from "@/features/common/SearchBar/hooks/useUpdateJoinCatMount";
import { decapt, isArr } from "@/core/lib/lib";
import { booksSliceWorkerAPI } from "@/features/WorkerLayout/BooksLayout/booksSliceWorkerAPI";
import { useEffect, useState, type FC } from "react";
import { FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
import BookItemWorker from "./components/BookItemWorker";
import BreadCrumb from "@/components/elements/BreadCrumb";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { schemaSearchBooks } from "@/features/common/SearchBar/schemasZ/owner/books";
import SpinnerBtn from "@/components/elements/spinners/SpinnerBtn/SpinnerBtn";

const BookListWorker: FC = () => {
  const { user } = useGetU();

  const [defVals, setDefVals] = useState<{ [key: string]: string[] }>({});

  const { formSearchBooksWorkerCtx: formCtx } = useFormCtxConsumer();
  const { watch } = formCtx;

  const storeID = useParams()?.bookStoreID;
  const canStay = REG_ID.test(storeID ?? "") && user?.isWorker;

  const { innerJoinedCatCtx, setInnerJoinedCat } = useSearchCtx();

  const hook = booksSliceWorkerAPI.useLazyGetAllBooksWorkerQuery();
  const res = hook[1];
  const { data: { books } = {} } = res ?? {};

  useUpdateJoinCatMount({
    watch,
    innerJoinedCatCtx,
    setInnerJoinedCat,
  });

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
      {res?.isLoading ? (
        <div className="w-full flex justify-start mt-5">
          <SpinnerBtn />
        </div>
      ) : (
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
      )}

      <div className="p_page -mb-[175px]">
        <FormProvider {...formCtx}>
          <SearchBar
            {...({
              hook,
              txtInputs: fieldsInputsBooksWorker,
              filters: workerBooksFiltersBooks,
              sorters: workerSortersBooks,
              numericFilters: workerNumericFieldsBooks,
              innerJoinCat: true,
              paramID: "bookStoreID",
              defVals,
              schema: schemaSearchBooks,
            } as any)}
          />
        </FormProvider>

        <WrapperContentAPI
          {...({ formCtx, hook, paramID: "bookStoreID" } as any)}
        >
          <div className="list_items_app">
            {isArr(books) &&
              books!.map((el) => <BookItemWorker key={el.id} {...{ el }} />)}
          </div>
        </WrapperContentAPI>
      </div>
    </WrapPageAPI>
  );
};

export default BookListWorker;
