import SearchBar from "@/common/forms/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import {
  fieldsSearchStoreWorker,
  numericFiltersStoreWorker,
  sorterStoreWorker,
  storeFiltersWorker,
} from "@/core/config/fieldsData/SearchBar/worker/store";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useScroll } from "@/core/hooks/hooks";
import { __cg, isArr } from "@/core/lib/lib";
import { bookStoresWorkerSliceAPI } from "@/features/WorkerLayout/BookStores/bookStoresWorkerSliceAPI";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";

const BookStoreListWorker: FC = () => {
  useScroll();

  const { formWorkerBookStores: formCtx } = useFormCtxConsumer();

  const { handleSubmit } = formCtx;

  const handleSave = handleSubmit(() => {
    __cg("submitted ✌🏼");
  });

  const hook =
    bookStoresWorkerSliceAPI.endpoints.getAllStoresWorker.useLazyQuery();
  // eslint-disable-next-line
  const [_, res] = hook;
  const { data: { bookStores } = {} } = res ?? {};

  return (
    <WrapPageAPI {...{ isLoading: res?.isLoading }}>
      <div className="parent__page -mb-[175px]">
        <FormProvider {...formCtx}>
          <SearchBar
            {...{
              hook,
              handleSave,
              txtInputs: fieldsSearchStoreWorker,
              filters: storeFiltersWorker,
              numericFilters: numericFiltersStoreWorker,
              sorters: sorterStoreWorker,
            }}
          />
        </FormProvider>

        <WrapperContentAPI {...{ formCtx, hook }}>
          <div className="parent__cards"></div>
        </WrapperContentAPI>
      </div>
    </WrapPageAPI>
  );
};

export default BookStoreListWorker;
