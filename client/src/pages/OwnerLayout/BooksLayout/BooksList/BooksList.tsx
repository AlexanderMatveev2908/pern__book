import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useGetU } from "@/core/hooks/all/useGetU";
import type { FC } from "react";
import { FormProvider } from "react-hook-form";

const BooksList: FC = () => {
  const { user } = useGetU();
  const { formOwnerBooksCtx: formCtx } = useFormCtxConsumer();

  return (
    <WrapPageAPI
      {...{
        canStay: user?.isOwner,
      }}
    >
      <div className="parent__page -mb-[175px]">
        <FormProvider {...formCtx}>I am a child</FormProvider>
      </div>
    </WrapPageAPI>
  );
};

export default BooksList;
