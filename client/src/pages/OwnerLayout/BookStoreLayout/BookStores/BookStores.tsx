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
import { FC, useEffect } from "react";
import { FormProvider } from "react-hook-form";
import BookStoreItem from "./components/BookStoreItem";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useClearCacheItem } from "@/core/hooks/all/useClearCacheItem";
import { TagsAPI } from "@/types/types";
import { useGetU } from "@/core/hooks/all/useGetU";
import { bookStoreSliceAPI } from "@/features/OwnerLayout/bookStores/bookStoreSliceAPI";
import { msgsFormStore } from "@/core/lib/all/forms/schemaZ/SearchBar/store";
import { makeNum } from "@/core/lib/lib";

const BookStores: FC = () => {
  useScroll();

  const { user } = useGetU();
  const ctx = useSearchCtx();

  const { formOwnerStoresCtx: formCtx } = useFormCtxConsumer();
  const {
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = formCtx;
  const realTimeVals = watch();
  const handleSave = handleSubmit(() => {});

  const hook = bookStoreSliceAPI.endpoints.getAllStores.useLazyQuery();
  const [trigger, res] = hook;
  const { data: { bookStores } = {} } = res ?? {};

  useClearCacheItem({
    nameQ: "getBookStore",
    slice: bookStoreSliceAPI,
    tag: TagsAPI.BOOK_STORE,
  });

  useEffect(() => {
    const handleErrors = () => {
      if (
        errors?.minAvgPrice?.message === msgsFormStore.price.min ||
        errors?.maxAvgPrice?.message === msgsFormStore.price.max
      ) {
        if (
          makeNum("min", realTimeVals?.minAvgPrice) <
          makeNum("max", realTimeVals?.maxAvgPrice)
        ) {
          clearErrors("minAvgPrice");
          clearErrors("maxAvgPrice");
        }
      }
      if (
        errors?.minAvgQty?.message === msgsFormStore.qty.min ||
        errors?.maxAvgQty?.message === msgsFormStore.qty.max
      ) {
        if (
          makeNum("min", realTimeVals?.minAvgQty) <
          makeNum("max", realTimeVals?.maxAvgQty)
        ) {
          clearErrors("minAvgQty");
          clearErrors("maxAvgQty");
        }
      }
      if (
        errors?.managers?.message === msgsFormStore.work.managers ||
        errors?.employees?.message === msgsFormStore.work.employees
      ) {
        if (
          makeNum("min", realTimeVals?.managers) <
          makeNum("max", realTimeVals?.workers)
        )
          clearErrors("managers");
        if (
          makeNum("min", realTimeVals?.employees) <
          makeNum("max", realTimeVals?.workers)
        )
          clearErrors("employees");
      }
    };

    handleErrors();
  }, [
    realTimeVals,
    clearErrors,
    errors?.minAvgPrice,
    errors?.maxAvgPrice,
    errors,
  ]);

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
