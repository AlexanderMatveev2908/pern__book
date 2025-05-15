import BookForm from "@/common/forms/BookForm/BookForm";
import Title from "@/components/elements/Title";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";

const CreateBook: FC = () => {
  const { createBookFormCtx: formCtx } = useFormCtxConsumer();

  return (
    <div className="parent__page">
      <Title {...{ title: "add book" }} />

      <div className="w-full grid justify-items-center gap-6">
        <FormProvider {...formCtx}>
          <BookForm />
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateBook;
