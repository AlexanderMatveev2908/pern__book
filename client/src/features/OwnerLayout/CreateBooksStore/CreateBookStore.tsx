import BookStoreForm from "@/components/forms/BookStore/BookStoreForm";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { useFocus } from "@/hooks/hooks";
import { schemaBookStore } from "@/lib/all/forms/schemaZ/bookStore";
import { UserType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const CreateBookStore = () => {
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

  const handleSave = formCtx.handleSubmit((formDataHook: FormBookStoreType) => {
    console.log(formDataHook);
  });

  useFocus({ setFocus: formCtx.setFocus, key: "name" });

  return (
    <div className="w-full grid justify-items-center gap-6">
      <FormProvider {...formCtx}>
        <BookStoreForm {...{ handleSave }} />
      </FormProvider>
    </div>
  );
};
export default CreateBookStore;
