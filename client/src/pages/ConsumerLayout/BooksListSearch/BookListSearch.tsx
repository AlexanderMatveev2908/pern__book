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
import { consumerSliceAPI } from "@/features/ConsumerLayout/consumerSliceAPI";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";

const BookListSearch: FC = () => {
  const { formSearchBooksConsumerCtx: formCtx } = useFormCtxConsumer();

  const hook = consumerSliceAPI.endpoints.getAllBooks.useLazyQuery();

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
          <div className=""></div>
        </WrapperContentAPI>
      </div>
    </WrapPageAPI>
  );
};

export default BookListSearch;
