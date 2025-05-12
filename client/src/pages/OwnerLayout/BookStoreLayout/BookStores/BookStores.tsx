import SearchBar from "@/common/forms/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import {
  fieldsSearchStore,
  numericFiltersStore,
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
import { setLimitCards } from "@/core/lib/lib";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";

const BookStores: FC = () => {
  useScroll();

  const { data: { user } = {} } = useGetUserProfileQuery() ?? {};

  const { formOwnerStoresCtx: formCtx } = useFormCtxConsumer();
  const ctx = useSearchCtx();
  const {
    args,
    setIsPending,
    setArgs,
    preSubmit: { hasFormErrs, isPopulated },
  } = ctx;
  const { handleSubmit, setFocus, getValues } = formCtx;

  const res = bookStoreSliceAPI.endpoints.getAllStores.useQuery(
    { ...args } as ReqQueryAPI<SearchStoreFormType>,
    {
      skip: hasFormErrs || !isPopulated,
    }
  );
  useWrapQueryAPI({ ...res });
  const { data } = res ?? {};
  const { bookStores } = data ?? {};
  useFocus({ key: "name", setFocus });

  const handleSave = handleSubmit(() => {
    setIsPending({ el: "submit", val: true });

    setArgs({
      ...getValues(),
      page: args?.page ?? 0,
      limit: args?.limit ?? setLimitCards(),
    });
    res.refetch();
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
              isFetching: res?.isFetching,
              handleSave,
              txtInputs: fieldsSearchStore,
              filters: storeFilters,
              numericFilters: numericFiltersStore,
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
