import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { booksSLiceAPI } from "../../booksSliceAPI";
import { useWrapMutationAPI, useWrapQueryAPI } from "@/core/hooks/hooks";
import { makeBooksFormData } from "@/core/lib/all/forms/processVals/books";
import { handleErrsBooks } from "@/core/lib/all/forms/errPostSubmit/books";
import BreadCrumb from "@/components/elements/BreadCrumb";
import Title from "@/components/elements/Title";
import { FormProvider } from "react-hook-form";
import BookForm from "@/common/forms/BookForm/BookForm";
import { isArrOk, makeRandomMinMax } from "@/core/lib/lib";
import { doLorem } from "@/core/lib/all/utils/place";
import WrapApp from "@/components/HOC/WrapApp";

const CreateBookOwner: FC = () => {
  const nav = useNavigate();

  const { createBookFormCtx: formCtx } = useFormCtxConsumer();

  const { user } = useGetU();

  const res =
    booksSLiceAPI.endpoints.getStoresInfo.useQuery(undefined, {
      refetchOnMountOrArgChange: true,
    }) ?? {};
  const { data: { stores } = {} } = res;

  useEffect(() => {
    if (isArrOk(stores)) {
      const { setValue } = formCtx;

      setValue(
        "year",
        makeRandomMinMax(1450, new Date().getFullYear()).toFixed(0),
        { shouldValidate: true }
      );
      setValue("description", doLorem(50), { shouldValidate: true });
      setValue("price", makeRandomMinMax(1, 50).toFixed(2), {
        shouldValidate: true,
      });
      setValue("qty", makeRandomMinMax(1, 100).toFixed(0), {
        shouldValidate: true,
      });
    }
  }, [formCtx, stores]);

  useWrapQueryAPI({ ...res });

  const { handleSubmit, setFocus, reset } = formCtx;
  const [mutate, { isLoading: isCreateLoading }] =
    booksSLiceAPI.endpoints.createBook.useMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const handleSave = handleSubmit(
    async (formDataHook) => {
      const formData = makeBooksFormData(formDataHook);

      const res = await wrapMutationAPI({
        cbAPI: () => mutate(formData),
      });

      if (!res) return;

      reset({});
      nav(`/owner/books/${res.ID}`, { replace: true });
    },
    (errs) => {
      handleErrsBooks(errs, setFocus);

      return errs;
    }
  );

  return (
    <WrapApp
      {...{
        canStay: user?.isOwner,
        ...res,
        isSuccess: isArrOk(stores),
      }}
    >
      {() => (
        <>
          <BreadCrumb
            {...{
              els: [
                { label: "admin", path: "#" },
                {
                  label: "Books",
                  path: user?.hasBooks ? "/owner/books/list" : "#",
                },
                { label: "add book", path: "#" },
              ],
            }}
          />

          <Title {...{ title: "add book" }} />

          <div className="w-full grid justify-items-center gap-6">
            <FormProvider {...formCtx}>
              <BookForm
                {...{ handleSave, isPending: isCreateLoading, stores }}
              />
            </FormProvider>
          </div>
        </>
      )}
    </WrapApp>
  );
};

export default CreateBookOwner;
