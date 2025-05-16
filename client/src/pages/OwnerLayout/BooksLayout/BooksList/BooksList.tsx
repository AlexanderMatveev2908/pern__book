import SearchBar from "@/common/forms/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { fieldsInputsBooks } from "@/core/config/fieldsData/SearchBar/books";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useGetU } from "@/core/hooks/all/useGetU";
import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";

const BooksList: FC = () => {
  const { user } = useGetU();
  const { formOwnerBooksCtx: formCtx } = useFormCtxConsumer();

  const hook = booksSLiceAPI.useLazyGetAllBooksQuery();
  const [trigger, res] = hook;

  return (
    <WrapPageAPI
      {...{
        canStay: user?.isOwner,
      }}
    >
      <div className="parent__page -mb-[175px]">
        <FormProvider {...formCtx}>
          <SearchBar {...{ hook, txtInputs: fieldsInputsBooks }} />
        </FormProvider>
      </div>
    </WrapPageAPI>
  );
};

export default BooksList;
