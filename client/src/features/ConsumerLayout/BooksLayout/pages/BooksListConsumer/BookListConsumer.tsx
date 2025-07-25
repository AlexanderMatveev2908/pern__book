/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchBar from "@/common/SearchBar/SearchBar";
import BreadCrumb from "@/components/elements/BreadCrumb";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import {
  consumerFieldsTxt,
  consumerFiltersBooks,
  numericFiltersBooksConsumer,
  sortersBooksConsumer,
} from "@/features/common/SearchBar/fields/consumer/books";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { schemaConsumerBooks } from "@/features/common/SearchBar/schemasZ/consumer/books";
import { isArrOk } from "@/core/lib/lib";
import { consumerBooksSliceAPI } from "@/features/ConsumerLayout/BooksLayout/consumerBooksSliceAPI";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import BookItemConsumer from "./components/BookItemConsumer";
import WrapApp from "@/components/HOC/WrapApp";

const BookListConsumer: FC = () => {
  const { formSearchBooksConsumerCtx: formCtx } = useFormCtxConsumer();

  const hook =
    consumerBooksSliceAPI.endpoints.getAllBooksConsumer.useLazyQuery();
  const [_, res] = hook;
  const { data: { books } = {} } = res ?? {};

  return (
    <WrapApp>
      {() => (
        <>
          <BreadCrumb
            {...{
              els: [
                { label: "search", path: "#" },
                { label: "books", path: "#" },
              ],
            }}
          />

          <div className="p_page -mb-[175px] ">
            <FormProvider {...formCtx}>
              <SearchBar
                {...({
                  hook,
                  txtInputs: consumerFieldsTxt,
                  filters: consumerFiltersBooks,
                  sorters: sortersBooksConsumer,
                  numericFilters: numericFiltersBooksConsumer,
                  innerJoinCat: true,
                  schema: schemaConsumerBooks,
                } as any)}
              />
            </FormProvider>

            <WrapperContentAPI
              {...({ formCtx, hook, isSuccess: isArrOk(books) } as any)}
            >
              {() => (
                <div className="list_items_app">
                  {books!.map((el) => (
                    <BookItemConsumer key={el.id} {...{ el }} />
                  ))}
                </div>
              )}
            </WrapperContentAPI>
          </div>
        </>
      )}
    </WrapApp>
  );
};

export default BookListConsumer;
