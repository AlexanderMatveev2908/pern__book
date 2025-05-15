import BookForm from "@/common/forms/BookForm/BookForm";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useGetU } from "@/core/hooks/all/useGetU";
import { useScroll } from "@/core/hooks/hooks";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";

const CreateBook: FC = () => {
  useScroll();

  const { createBookFormCtx: formCtx } = useFormCtxConsumer();
  const { user, isLoading, error, isError } = useGetU();

  return (
    <WrapPageAPI {...{ canStay: user?.isOwner, isError, error, isLoading }}>
      <div className="parent__page">
        <Title {...{ title: "add book" }} />

        <div className="w-full grid justify-items-center gap-6">
          <FormProvider {...formCtx}>
            <BookForm />
          </FormProvider>
        </div>
      </div>
    </WrapPageAPI>
  );
};

export default CreateBook;
