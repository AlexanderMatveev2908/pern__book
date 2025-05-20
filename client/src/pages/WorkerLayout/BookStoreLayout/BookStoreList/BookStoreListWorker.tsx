import SearchBar from "@/common/forms/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useScroll } from "@/core/hooks/hooks";
import { __cg } from "@/core/lib/lib";
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
  const [trigger, res] = hook;

  return (
    <WrapPageAPI {...{ isLoading: res?.isLoading }}>
      <div className="parent__page -mb-[175px]">
        <FormProvider {...formCtx}>
          <SearchBar
            {...{
              hook,
              handleSave,
              // txtInputs: fieldsSearchStore,
              // filters: storeFilters,
              // numericFilters: numericFiltersStore,
              // sorters: sorterStore,
            }}
          />
        </FormProvider>
      </div>
    </WrapPageAPI>
  );
};

export default BookStoreListWorker;
