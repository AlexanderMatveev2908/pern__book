import BreadCrumb from "@/components/elements/BreadCrumb";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
// import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import type { FC } from "react";

const BookListSearch: FC = () => {
  // const { formSearchBooksConsumerCtx: formCtx } = useFormCtxConsumer();

  return (
    <WrapPageAPI>
      <BreadCrumb
        {...{
          els: [
            { label: "search", path: "#" },
            { label: "books", path: "#" },
          ],
        }}
      />

      <div className="p_page -mb-[175px]">
        {/* <FormProvider {...formCtx}>
          <SearchBar />
        </FormProvider> */}
      </div>
    </WrapPageAPI>
  );
};

export default BookListSearch;
