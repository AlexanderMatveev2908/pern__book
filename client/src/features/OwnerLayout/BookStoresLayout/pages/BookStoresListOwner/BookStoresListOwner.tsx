/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetU } from "@/core/hooks/all/api/useGetU";
import type { FC } from "react";
import { bookStoreSliceAPI } from "../../bookStoreSliceAPI";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import BreadCrumb from "@/components/elements/BreadCrumb";
import { FormProvider } from "react-hook-form";
import SearchBar from "@/common/SearchBar/SearchBar";
import {
  fieldsSearchStore,
  numericFiltersStore,
  sorterStore,
  storeFilters,
} from "@/features/common/SearchBar/fields/owner/store";
import { searchBarStore } from "@/features/common/SearchBar/schemasZ/owner/store";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import BookStoreItemOwner from "@/features/OwnerLayout/BookStoresLayout/pages/BookStoresListOwner/components/BookStoreItem";
import { isArr } from "@/core/lib/lib";

const BookStoresListOwner: FC = () => {
  const { user } = useGetU();

  // ? I DECIDED TO HANDLE THE REQUEST OF DATA INSIDE BUTTONS OF SEARCH__BAR TO ENCAPSULATE LOGIC AND AVOID REPEATING SAME CODE WITH ALMOST NONE DIFFERENCES

  const { formOwnerStoresCtx: formCtx } = useFormCtxConsumer();

  const hook = bookStoreSliceAPI.endpoints.getAllStores.useLazyQuery();
  // eslint-disable-next-line
  const [_, res] = hook;
  const { data: { bookStores } = {} } = res ?? {};

  return (
    <WrapPageAPI
      {...{
        canStay: user?.isOwner,
      }}
    >
      <BreadCrumb
        {...{
          els: [
            { label: "admin", path: "#" },
            { label: "Book Stores", path: "#" },
          ],
        }}
      />

      <FormProvider {...formCtx}>
        <SearchBar
          {...({
            hook,
            txtInputs: fieldsSearchStore,
            filters: storeFilters,
            numericFilters: numericFiltersStore,
            sorters: sorterStore,
            schema: searchBarStore,
          } as any)}
        />
      </FormProvider>

      <WrapperContentAPI {...({ formCtx, hook } as any)}>
        <div className="list_items_app">
          {isArr(bookStores) &&
            bookStores!.map((el) => (
              <BookStoreItemOwner key={el.id} {...{ el }} />
            ))}
        </div>
      </WrapperContentAPI>
    </WrapPageAPI>
  );
};

export default BookStoresListOwner;
