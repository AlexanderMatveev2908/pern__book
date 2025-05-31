/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchBar from "@/common/forms/SearchBar/SearchBar";
import BreadCrumb from "@/components/elements/BreadCrumb";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import {
  consumerFieldsTxt,
  consumerFiltersBooks,
  numericFiltersBooksConsumer,
  sortersBooksConsumer,
} from "@/core/config/fieldsData/SearchBar/consumer/fields";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { schemaConsumerBooks } from "@/core/lib/all/forms/schemaZ/SearchBar/consumer/books";
import { isArrOk } from "@/core/lib/lib";
import { consumerSliceAPI } from "@/features/ConsumerLayout/consumerSliceAPI";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import BookItemConsumer from "./components/BookItemConsumer";

const BookListSearch: FC = () => {
  const { formSearchBooksConsumerCtx: formCtx } = useFormCtxConsumer();

  const hook = consumerSliceAPI.endpoints.getAllBooksConsumer.useLazyQuery();
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
          {isArrOk(books) &&
            books!.map((el) => <BookItemConsumer key={el.id} {...{ el }} />)}
        </WrapperContentAPI>
      </div>
    </WrapPageAPI>
  );
};

export default BookListSearch;
