import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useFocus, useWrapMutationAPI } from "@/core/hooks/hooks";
import { useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useCreateBookStoreMutation } from "../../bookStoreSliceAPI";
import { schemaBookStore } from "@/core/lib/all/forms/schemaZ/bookStore";
import { useMakeSchemaXStore } from "@/core/hooks/all/forms/bookStore/useMakeSchemaXStore";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormSwap } from "@/core/hooks/all/forms/useSwapForm/useSwapForm";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";
import { fieldsSwapStore } from "@/core/config/fieldsData/bookStores/forms";
import { makeFormDataStore } from "@/core/lib/all/forms/processVals/bookStore";
import { handleFocusErrStore } from "@/core/lib/all/forms/errPostSubmit/bookStore";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import BreadCrumb from "@/components/elements/BreadCrumb";
import Title from "@/components/elements/Title";
import BookStoreForm from "@/common/forms/BookStore/BookStoreForm";
import { UserRole } from "@/types/types";
import { doLorem } from "@/core/lib/all/utils/place";

export type FormBookStoreType = z.infer<typeof schemaBookStore>;

const CreateBooksStoreOwner: FC = () => {
  const nav = useNavigate();
  const { user } = useGetU();

  const [createBookStore, { isLoading }] = useCreateBookStoreMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const schemaX = useMakeSchemaXStore();
  const formCtx = useForm<FormBookStoreType>({
    resolver: zodResolver(schemaX),
    mode: "onChange",
    shouldFocusError: false,
    defaultValues: {
      email: "",
      country: "",
      state: "",
      city: "",
      street: "",
      zipCode: "",
      phone: "",
      name: "store__t0",
      categories: ["literature & fiction", "philosophy"],
      deliveryTime: "14",
      deliveryPrice: "75",
      freeDeliveryAmount: "100",
      description: doLorem(50),
    },
  });

  const {
    watch,
    formState: { errors },
    handleSubmit,
    setFocus,
    setValue,
  } = formCtx;
  const { setCurrForm } = useFormSwap({
    ...useSwapCtxConsumer(),
    watch,
    errors,
    fields: fieldsSwapStore,
  });

  // const vals = watch();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    handleSubmit(
      async (data) => {
        const formData = makeFormDataStore(data);

        const res = await wrapMutationAPI({
          cbAPI: () => createBookStore(formData),
        });

        if (!res) return;

        // reset({
        //   items: [
        //     {
        //       email: "",
        //       role: null,
        //     },
        //   ],
        // });
        nav(`/owner/book-store/${res.bookStoreID}`, { replace: true });
      },
      async (errs) => {
        await handleFocusErrStore(setFocus, errs, setCurrForm);
      }
    )(e);
  };
  // const { isFormOk } = useListenFormOk({
  //   errors,
  //   watch,
  //   customValidateCB: () => canSaveStore(vals),
  // });
  useFocus({ setFocus: formCtx.setFocus, key: "name" });

  useEffect(() => {
    setValue("items", [
      // {
      //   email: "",
      //   role: null,
      // },
      {
        email: "john@gmail.com",
        role: UserRole.MANAGER,
      },
      {
        email: "jane@gmail.com",
        role: UserRole.EMPLOYEE,
      },
    ]);
  }, [setValue]);

  return (
    <WrapPageAPI {...{ canStay: user?.isVerified }}>
      <BreadCrumb
        {...{
          els: [
            { label: "admin", path: "#" },
            {
              label: "Book Stores",
              path: user?.isOwner ? "/owner/book-store/book-stores" : "#",
            },
            { label: "create", path: "#" },
          ],
        }}
      />

      <Title {...{ title: "create a bookstore" }} />
      <div className="w-full grid justify-items-center gap-6">
        <FormProvider {...formCtx}>
          <BookStoreForm
            {...{ handleSave, isFormOk: true, isLoading, role: UserRole.OWNER }}
          />
        </FormProvider>
      </div>
    </WrapPageAPI>
  );
};

export default CreateBooksStoreOwner;
