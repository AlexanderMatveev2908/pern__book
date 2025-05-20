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
import { captAll, isArr } from "@/core/lib/lib";
import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
import { useEffect, type FC } from "react";
import { FormProvider } from "react-hook-form";
import BookItem from "./components/BookItem";
import { useScroll } from "@/core/hooks/hooks";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { FieldJoinCatType } from "@/core/contexts/SearchCtx/reducer/initState";
import { subcategories } from "@/types/all/books";
import { v4 } from "uuid";
import PdfBtn from "./components/PdfBtn";

const BooksList: FC = () => {
  useScroll();

  const { user } = useGetU();
  const { formOwnerBooksCtx: formCtx } = useFormCtxConsumer();
  const { innerJoinedCat, setInnerJoinedCat } = useSearchCtx();
  const { handleSubmit, watch } = formCtx;
  const mainCatRealTime = watch("mainCategories");
  const handleSave = handleSubmit(() => {});

  const hook = booksSLiceAPI.endpoints.getAllBooks.useLazyQuery();
  const res = hook[1];
  const { data: { books } = {}, isLoading, isFetching } = res;

  useEffect(() => {
    const mainCat = mainCatRealTime ?? [];

    if (mainCat.length && !innerJoinedCat.length) {
      const updatedJoinedFields: FieldJoinCatType[] = Object.entries(
        subcategories
      )
        .filter(([k]) => mainCat.includes(k))
        // eslint-disable-next-line
        .flatMap(([_, v]) =>
          v.map((sub) => ({
            id: v4(),
            val: sub,
            label: captAll(sub),
          }))
        );

      setInnerJoinedCat(updatedJoinedFields);
    }
  }, [mainCatRealTime, innerJoinedCat, setInnerJoinedCat]);

  return (
    <WrapPageAPI
      {...{
        canStay: user?.hasBooks,
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
              // ? JUST A METAPHOR
              innerJoinCat: true,
            }}
          />
        </FormProvider>

        {!isLoading && !isFetching && books?.length && <PdfBtn />}

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
