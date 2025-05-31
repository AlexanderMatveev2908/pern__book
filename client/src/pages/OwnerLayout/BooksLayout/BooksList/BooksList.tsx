/* eslint-disable @typescript-eslint/no-explicit-any */
import SearchBar from "@/common/forms/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { __cg, isArr } from "@/core/lib/lib";
import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
import { type FC } from "react";
import { FormProvider } from "react-hook-form";
import BookItem from "./components/BookItem";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import PdfBtn from "./components/PdfBtn";
import {
  fieldsInputsBooks,
  ownerBooksFilters,
  ownerBooksNumericFilters,
  ownerBooksSorters,
} from "@/features/common/SearchBar/fields/owner/books";
import { useUpdateJoinCatMount } from "@/core/hooks/all/forms/searchBar/useUpdateJoinCatMount";
import BreadCrumb from "@/components/elements/BreadCrumb";
import { schemaSearchBooks } from "@/core/lib/all/forms/schemaZ/SearchBar/owner/books";

const BooksList: FC = () => {
  const { user } = useGetU();
  const { formOwnerBooksCtx: formCtx } = useFormCtxConsumer();
  const { innerJoinedCatCtx, setInnerJoinedCat } = useSearchCtx();
  const { handleSubmit, watch } = formCtx;
  const handleSave = handleSubmit(
    () => {
      __cg("submitted ✌🏼");
    },
    (errs) => {
      console.log(errs);
      return errs;
    }
  );

  const hook = booksSLiceAPI.endpoints.getAllBooks.useLazyQuery();
  const res = hook[1];
  const { data: { books } = {}, isLoading, isFetching } = res;

  useUpdateJoinCatMount({
    watch,
    innerJoinedCatCtx,
    setInnerJoinedCat,
  });
  return (
    <WrapPageAPI
      {...{
        canStay: user?.hasBooks,
      }}
    >
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
              filters: ownerBooksFilters,
              numericFilters: ownerBooksNumericFilters,
              handleSave,
              sorters: ownerBooksSorters,
              // ? JUST A METAPHOR
              innerJoinCat: true,
              schema: schemaSearchBooks,
            } as any)}
          />
        </FormProvider>

        {!isLoading && !isFetching && books?.length && <PdfBtn />}

        <WrapperContentAPI {...({ formCtx, hook } as any)}>
          <div className="p_cards">
            {isArr(books) &&
              books!.map((el) => <BookItem key={el.id} {...{ el }} />)}
          </div>
        </WrapperContentAPI>
      </div>
    </WrapPageAPI>
  );
};

export default BooksList;
