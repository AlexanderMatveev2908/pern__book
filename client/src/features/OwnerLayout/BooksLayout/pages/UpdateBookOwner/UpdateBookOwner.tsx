import { REG_ID } from "@/core/config/regex";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import type { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { booksSLiceAPI } from "../../booksSliceAPI";
import { useWrapMutationAPI, useWrapQueryAPI } from "@/core/hooks/hooks";
import { useMixVars } from "@/core/hooks/all/api/useMixVars";
import { FormProvider, useForm } from "react-hook-form";
import { BookFormType } from "@/core/contexts/FormsCtx/hooks/useFormsCtxProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaBookForm } from "@/core/lib/all/forms/schemaZ/books";
import { usePopulateBookForm } from "@/core/hooks/all/forms/books/usePopulateBookForm";
import { useCheckEqDataBook } from "@/core/hooks/all/forms/books/useCheckEqDataBook";
import { makeBooksFormData } from "@/core/lib/all/forms/processVals/books";
import { handleErrsBooks } from "@/core/lib/all/forms/errPostSubmit/books";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import BreadCrumb from "@/components/elements/BreadCrumb";
import Title from "@/components/elements/Title";
import BookForm from "@/common/forms/BookForm/BookForm";

const UpdateBookOwner: FC = () => {
  const nav = useNavigate();

  const { bookID } = useParams() ?? {};
  const isValidID = REG_ID.test(bookID ?? "");

  const { user } = useGetU();
  const res = booksSLiceAPI.endpoints.getSingleBook.useQuery(bookID!, {
    skip: !isValidID,
  });
  const { data: { book } = {} } = res;
  useWrapQueryAPI({ ...res });
  const resStores =
    booksSLiceAPI.endpoints.getStoresInfo.useQuery(undefined, {
      refetchOnMountOrArgChange: true,
    }) ?? {};
  const { data: { stores } = {} } = resStores;
  useWrapQueryAPI({ ...resStores });

  const isLoading = useMixVars({
    varB: resStores.isLoading,
    varA: res.isLoading,
  });
  const isError = useMixVars({
    varB: resStores.isError,
    varA: res.isError,
  });
  const error = useMixVars({
    varB: resStores.error,
    varA: res.error,
  });
  const isSuccess = useMixVars({
    varB: resStores.isSuccess,
    varA: res.isSuccess,
  });

  const formCtx = useForm<BookFormType>({
    resolver: zodResolver(schemaBookForm),
    mode: "onChange",
  });
  const { handleSubmit, setFocus, watch, setValue } = formCtx;

  usePopulateBookForm({
    setValue,
    book,
  });

  const { isSame } = useCheckEqDataBook({
    watch,
    book,
  });

  const [mutate, { isLoading: isUpdateLoading }] =
    booksSLiceAPI.useUpdateBookMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const handleSave = handleSubmit(
    async (formDataHook) => {
      const formData = makeBooksFormData(formDataHook);
      const res = await wrapMutationAPI({
        cbAPI: () => mutate({ formData, bookID: bookID as string }),
      });

      if (!res) return;

      nav(`/owner/books/${book?.id ?? ""}`, { replace: true });
    },
    (errs) => {
      handleErrsBooks(errs, setFocus);
    }
  );

  return (
    <WrapPageAPI
      {...{
        canStay: user?.hasBooks && isValidID,
        isLoading,
        isError,
        error,
        isSuccess,
      }}
    >
      <BreadCrumb
        {...{
          els: [
            { label: "admin", path: "#" },
            { label: "Books", path: "/owner/books/list" },
            { label: "update", path: "#" },
          ],
        }}
      />

      <Title {...{ title: "update book" }} />

      <div className="w-full grid justify-items-center gap-6">
        <FormProvider {...formCtx}>
          <BookForm
            {...{
              handleSave,
              isPending: isUpdateLoading,
              stores,
              isDisabled: isSame,
            }}
          />
        </FormProvider>
      </div>
    </WrapPageAPI>
  );
};

export default UpdateBookOwner;
