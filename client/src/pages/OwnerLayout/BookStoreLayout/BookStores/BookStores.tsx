import SearchBar from "@/common/forms/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import {
  fieldsSearchStore,
  numericFiltersStore,
  sorterStore,
  storeFilters,
} from "@/core/config/fieldsData/SearchBar/store";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { SearchStoreFormType } from "@/core/contexts/FormsCtx/hooks/useFormsCtxProvider";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useFocus, useScroll, useWrapQueryAPI } from "@/core/hooks/hooks";
import { bookStoreSliceAPI } from "@/features/OwnerLayout/bookStoreSliceAPI";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { FC } from "react";
import { FormProvider } from "react-hook-form";
import BookStoreItem from "./components/BookStoreItem";
import { ReqQueryAPI } from "@/types/types";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";

const BookStores: FC = () => {
  useScroll();

  const { data: { user } = {} } = useGetUserProfileQuery() ?? {};

  const { formOwnerStoresCtx: formCtx } = useFormCtxConsumer();
  const ctx = useSearchCtx();
  const {
    args,
    preSubmit: { hasFormErrs, isPopulated },
  } = ctx;
  const { handleSubmit, setFocus } = formCtx;

  const res = bookStoreSliceAPI.endpoints.getAllStores.useQuery(
    args as ReqQueryAPI<SearchStoreFormType>,
    {
      skip: hasFormErrs || !isPopulated,
      refetchOnMountOrArgChange: true,
    }
  );
  useWrapQueryAPI({ ...res });
  const { data } = res ?? {};
  const { bookStores } = data ?? {};
  useFocus({ key: "name", setFocus });

  const handleSave = handleSubmit(() => {});

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
              res,
              handleSave,
              txtInputs: fieldsSearchStore,
              filters: storeFilters,
              numericFilters: numericFiltersStore,
              sorters: sorterStore,
            }}
          />
        </FormProvider>

        <WrapperContentAPI {...{ ctx, formCtx, res }}>
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
