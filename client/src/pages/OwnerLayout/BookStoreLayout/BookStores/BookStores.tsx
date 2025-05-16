import SearchBar from "@/common/forms/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import {
  fieldsSearchStore,
  numericFiltersStore,
  sorterStore,
  storeFilters,
} from "@/core/config/fieldsData/SearchBar/store";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useScroll } from "@/core/hooks/hooks";
import { FC } from "react";
import { FormProvider } from "react-hook-form";
import BookStoreItem from "./components/BookStoreItem";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useClearCacheItem } from "@/core/hooks/all/useClearCacheItem";
import { TagsAPI } from "@/types/types";
import { useGetU } from "@/core/hooks/all/useGetU";
import { bookStoreSliceAPI } from "@/features/OwnerLayout/bookStores/bookStoreSliceAPI";

const BookStores: FC = () => {
  useScroll();

  const { user } = useGetU();
  const ctx = useSearchCtx();

  const { formOwnerStoresCtx: formCtx } = useFormCtxConsumer();
  const { handleSubmit } = formCtx;
  const handleSave = handleSubmit(() => {});

  const hook = bookStoreSliceAPI.endpoints.getAllStores.useLazyQuery();
  const [trigger, res] = hook;
  const { data: { bookStores } = {} } = res ?? {};

  useClearCacheItem({
    nameQ: "getBookStore",
    slice: bookStoreSliceAPI,
    tag: TagsAPI.BOOK_STORE,
  });

  return (
    <WrapPageAPI
      {...{
        canStay: user?.isOwner,
      }}
    >
      <div className="parent__page -mb-[175px]">
        <FormProvider {...formCtx}>
          <SearchBar
            {...{
              hook,
              handleSave,
              txtInputs: fieldsSearchStore,
              filters: storeFilters,
              numericFilters: numericFiltersStore,
              sorters: sorterStore,
            }}
          />
        </FormProvider>

        <WrapperContentAPI {...{ ctx, formCtx, res, trigger }}>
          <div className="w-full grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-10">
            {Array.isArray(bookStores) &&
              !!bookStores.length &&
              bookStores.map((el) => <BookStoreItem key={el.id} {...{ el }} />)}
          </div>
        </WrapperContentAPI>
      </div>
    </WrapPageAPI>
  );
};

export default BookStores;
