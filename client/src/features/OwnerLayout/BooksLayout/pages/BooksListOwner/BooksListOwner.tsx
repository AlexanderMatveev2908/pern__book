/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useUpdateJoinCatMount } from "@/features/common/SearchBar/hooks/useUpdateJoinCatMount";
import type { FC } from "react";
import { booksSLiceAPI } from "../../booksSliceAPI";
import BreadCrumb from "@/components/elements/BreadCrumb";
import { FormProvider } from "react-hook-form";
import SearchBar from "@/common/SearchBar/SearchBar";
import {
  fieldsInputsBooks,
  ownerBooksNumericFilters,
  ownerBooksSorters,
} from "@/features/common/SearchBar/fields/owner/books";
import { booksFilters } from "@/features/common/SearchBar/fields/general/books";
import { schemaSearchBooks } from "@/features/common/SearchBar/schemasZ/owner/books";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import { isArr } from "@/core/lib/lib";
import BookItemOwner from "@/features/OwnerLayout/BooksLayout/pages/BooksListOwner/components/BookItemOwner";
import PdfBtn from "@/features/OwnerLayout/BooksLayout/pages/BooksListOwner/components/PdfBtn";
import WrapApp from "@/components/HOC/WrapApp";

const BooksListOwner: FC = () => {
  const { user } = useGetU();
  const { formOwnerBooksCtx: formCtx } = useFormCtxConsumer();
  const { innerJoinedCatCtx, setInnerJoinedCat } = useSearchCtx();
  const { watch } = formCtx;

  const hook = booksSLiceAPI.endpoints.getAllBooks.useLazyQuery();
  const res = hook[1];
  const { data: { books } = {}, isLoading, isFetching } = res;

  useUpdateJoinCatMount({
    watch,
    innerJoinedCatCtx,
    setInnerJoinedCat,
  });

  return (
    <WrapApp
      {...{
        canStay: user?.hasBooks,
      }}
    >
      {() => (
        <>
          <BreadCrumb
            {...{
              els: [
                { label: "admin", path: "#" },
                { label: "Books", path: "#" },
              ],
            }}
          />

          <div className="p_page -mb-[175px]">
            <FormProvider {...formCtx}>
              <SearchBar
                {...({
                  hook,
                  txtInputs: fieldsInputsBooks,
                  filters: booksFilters,
                  numericFilters: ownerBooksNumericFilters,
                  sorters: ownerBooksSorters,
                  // ? JUST A METAPHOR
                  innerJoinCat: true,
                  schema: schemaSearchBooks,
                } as any)}
              />
            </FormProvider>

            {!isLoading && !isFetching && !!books?.length && <PdfBtn />}

            <WrapperContentAPI
              {...({ formCtx, hook, isSuccess: isArr(books) } as any)}
            >
              {() => (
                <div className="list_items_app">
                  {books!.map((el) => (
                    <BookItemOwner key={el.id} {...{ el }} />
                  ))}
                </div>
              )}
            </WrapperContentAPI>
          </div>
        </>
      )}
    </WrapApp>
  );
};

export default BooksListOwner;
