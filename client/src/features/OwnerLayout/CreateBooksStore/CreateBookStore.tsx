import BookStoreForm from "@/components/forms/BookStore/BookStoreForm";
import { useFocus } from "@/hooks/hooks";
import { schemaBookStore } from "@/lib/all/forms/schemaZ/bookStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  ...schemaBookStore(),
});
type FormBookStoreType = z.infer<typeof schema>;

const CreateBookStore = () => {
  const formCtx = useForm<FormBookStoreType>({
    resolver: zodResolver(schema),
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
