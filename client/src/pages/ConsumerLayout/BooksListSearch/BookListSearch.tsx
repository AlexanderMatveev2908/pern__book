/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchBar from "@/common/SearchBar/SearchBar";
import BreadCrumb from "@/components/elements/BreadCrumb";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import {
  consumerFieldsTxt,
  consumerFiltersBooks,
  numericFiltersBooksConsumer,
  sortersBooksConsumer,
} from "@/features/common/SearchBar/fields/consumer/fields";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { schemaConsumerBooks } from "@/features/common/SearchBar/schemasZ/consumer/books";
import { isArrOk } from "@/core/lib/lib";
import { consumerBooksSliceAPI } from "@/features/ConsumerLayout/books/consumerBooksSliceAPI";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import BookItemConsumer from "./components/BookItemConsumer";

const BookListSearch: FC = () => {
  const { formSearchBooksConsumerCtx: formCtx } = useFormCtxConsumer();

  const hook =
    consumerBooksSliceAPI.endpoints.getAllBooksConsumer.useLazyQuery();
  const [_, res] = hook;
  const { data: { books } = {} } = res ?? {};

  return (
    <WrapPageAPI>
      <BreadCrumb
        {...{
          els: [
            { label: "search", path: "#" },
            { label: "books", path: "#" },
          ],
        }}
      />

      <div className="p_page -mb-[175px]">
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

        <WrapperContentAPI {...({ formCtx, hook } as any)}>
          {isArrOk(books) && (
            <div className="p_cards">
              {books!.map((el) => (
                <BookItemConsumer key={el.id} {...{ el }} />
              ))}
            </div>
          )}
        </WrapperContentAPI>
      </div>
    </WrapPageAPI>
  );
};

export default BookListSearch;
