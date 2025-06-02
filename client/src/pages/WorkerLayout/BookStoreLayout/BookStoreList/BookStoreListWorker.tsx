/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchBar from "@/common/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import {
  fieldsSearchStoreWorker,
  numericFiltersStoreWorker,
  sorterStoreWorker,
  storeFiltersWorker,
} from "@/features/common/SearchBar/fields/worker/store";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { __cg, isArr } from "@/core/lib/lib";
import { bookStoresWorkerSliceAPI } from "@/features/WorkerLayout/BookStores/bookStoresWorkerSliceAPI";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import BookStoreItemWorker from "./components/BookStoreItemWorker";
import BreadCrumb from "@/components/elements/BreadCrumb";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { schemaWorkerStores } from "@/features/common/SearchBar/schemasZ/worker/stores";

const BookStoreListWorker: FC = () => {
  const { formWorkerBookStores: formCtx } = useFormCtxConsumer();

  const { user } = useGetU();

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
    <WrapPageAPI {...{ canStay: user?.isWorker }}>
      <BreadCrumb
        {...{
          els: [
            {
              label: "worker",
              path: "#",
            },
            {
              label: "book stores",
              path: "#",
            },
          ],
        }}
      />

      <div className="p_page -mb-[175px]">
        <FormProvider {...formCtx}>
          <SearchBar
            {...({
              hook,
              handleSave,
              txtInputs: fieldsSearchStoreWorker,
              filters: storeFiltersWorker,
              numericFilters: numericFiltersStoreWorker,
              sorters: sorterStoreWorker,
              schema: schemaWorkerStores,
            } as any)}
          />
        </FormProvider>

        <WrapperContentAPI {...({ formCtx, hook } as any)}>
          <div className="p_cards">
            {isArr(bookStores) &&
              bookStores!.map((el) => (
                <BookStoreItemWorker key={el.id} {...{ el }} />
              ))}
          </div>
        </WrapperContentAPI>
      </div>
    </WrapPageAPI>
  );
};

export default BookStoreListWorker;
