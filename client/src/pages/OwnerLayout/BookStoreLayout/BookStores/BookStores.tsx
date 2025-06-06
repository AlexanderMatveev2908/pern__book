/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchBar from "@/common/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import {
  fieldsSearchStore,
  numericFiltersStore,
  sorterStore,
  storeFilters,
} from "@/features/common/SearchBar/fields/owner/store";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { FC } from "react";
import { FormProvider } from "react-hook-form";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { bookStoreSliceAPI } from "@/features/OwnerLayout/bookStores/bookStoreSliceAPI";
import { isArr } from "@/core/lib/lib";
import BookStoreItemOwner from "./components/BookStoreItem";
import BreadCrumb from "@/components/elements/BreadCrumb";
import { searchBarStore } from "@/features/common/SearchBar/schemasZ/owner/store";

const BookStores: FC = () => {
  const { user } = useGetU();

  // ? I DECIDED TO HANDLE THE REQUEST OF DATA INSIDE BUTTONS OF SEARCH__BAR TO ENCAPSULATE LOGIC AND AVOID REPEATING SAME CODE WITH ALMOST NONE DIFFERENCES

  const { formOwnerStoresCtx: formCtx } = useFormCtxConsumer();
  const { handleSubmit } = formCtx;
  const handleSave = handleSubmit(() => {});

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
            handleSave,
            txtInputs: fieldsSearchStore,
            filters: storeFilters,
            numericFilters: numericFiltersStore,
            sorters: sorterStore,
            schema: searchBarStore,
          } as any)}
        />
      </FormProvider>

      <WrapperContentAPI {...({ formCtx, hook } as any)}>
        <div className="list_items_business">
          {isArr(bookStores) &&
            bookStores!.map((el) => (
              <BookStoreItemOwner key={el.id} {...{ el }} />
            ))}
        </div>
      </WrapperContentAPI>
    </WrapPageAPI>
  );
};

export default BookStores;
