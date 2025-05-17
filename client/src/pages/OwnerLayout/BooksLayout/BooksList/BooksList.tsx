import SearchBar from "@/common/forms/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import WrapperContentAPI from "@/components/HOC/WrapperContentAPI";
import {
  fieldsInputsBooks,
  ownerBooksFilters,
  ownerBooksNumericFilters,
  ownerBooksSorters,
} from "@/core/config/fieldsData/SearchBar/books";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useGetU } from "@/core/hooks/all/useGetU";
import { isArr } from "@/core/lib/lib";
import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import BookItem from "./components/BookItem";
import { useScroll } from "@/core/hooks/hooks";

const BooksList: FC = () => {
  useScroll();

  const { user } = useGetU();
  const { formOwnerBooksCtx: formCtx } = useFormCtxConsumer();
  const { handleSubmit } = formCtx;
  const handleSave = handleSubmit(() => {});

  const hook = booksSLiceAPI.endpoints.getAllBooks.useLazyQuery();
  const { data: { books } = {} } = hook[1];

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
              txtInputs: fieldsInputsBooks,
              filters: ownerBooksFilters,
              numericFilters: ownerBooksNumericFilters,
              handleSave,
              sorters: ownerBooksSorters,
            }}
          />
        </FormProvider>

        <WrapperContentAPI {...{ formCtx, hook }}>
          <div className="parent__cards">
            {isArr(books) &&
              books!.map((el) => <BookItem key={el.id} {...{ el }} />)}
          </div>
        </WrapperContentAPI>
      </div>
    </WrapPageAPI>
  );
};

export default BooksList;
