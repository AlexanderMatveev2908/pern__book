import BookStoreForm from "@/common/forms/BookStore/BookStoreForm";
import Title from "@/components/elements/Title";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { useFocus } from "@/core/hooks/hooks";
import { schemaBookStore } from "@/core/lib/all/forms/schemaZ/bookStore";
import { UserType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, FormEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useFormSwap } from "@/core/hooks/all/forms/useSwapAddress/useSwapForm";
import { fieldsSwapAddressStore } from "@/core/config/fieldsData/OwnerLayout/post";

const CreateBooksStore: FC = () => {
  const { data: { user } = {} } = (useGetUserProfileQuery() ??
    {}) as unknown as { data: { user: UserType } };

  const schemaX = schemaBookStore.and(z.object({})).superRefine((data, ctx) => {
    if (data.items?.length) {
      let i = 0;

      do {
        const curr = data.items[i];
        if (curr.email === user?.email) {
          ctx.addIssue({
            path: [`items.${i}.email`],
            message: "You can not hire yourself",
            code: "custom",
          });
          break;
        }

        i++;
      } while (i < data.items.length);
    }
  });

  type FormBookStoreType = z.infer<typeof schemaX>;

  const formCtx = useForm<FormBookStoreType>({
    resolver: zodResolver(schemaX),
    mode: "onChange",
  });

  const {
    watch,
    formState: { errors },
  } = formCtx;
  const dataSwap = useFormSwap({
    watch,
    errors,
    fields: fieldsSwapAddressStore,
  });
  const { setCurrForm } = dataSwap;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const swap = document.getElementById("swapFormStoreCreate");
    if (!swap) return;
    const distance =
      swap.getBoundingClientRect().top + window.scrollY - swap.offsetHeight / 2;

    setCurrForm(1, null);

    window.scroll({
      top: distance,
      behavior: "smooth",
    });
  };

  useFocus({ setFocus: formCtx.setFocus, key: "name" });

  return (
    <div className="parent__page">
      <Title {...{ title: "create a bookstore" }} />
      <div className="w-full grid justify-items-center gap-6">
        <FormProvider {...formCtx}>
          <BookStoreForm {...{ handleSave, dataSwap }} />
        </FormProvider>
      </div>
    </div>
  );
};
export default CreateBooksStore;
