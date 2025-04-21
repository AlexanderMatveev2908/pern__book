import ButtonIcon from "@/components/common/buttons/ButtonIcon/ButtonIcon";
import FormFieldBtn from "@/components/forms/components/inputs/FormFieldBtn";
import { FieldHeaderFooter, fieldsProfileHeader } from "@/config/fields/fields";
import { schemaEmail, schemaNames } from "@/lib/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  ...schemaNames(),
  ...schemaEmail(),
});

type UserFormType = z.infer<typeof schema>;

const UserProfile: FC = () => {
  const {
    register,
    formState: { errors },
    setFocus,
    handleSubmit,
  } = useForm<UserFormType>({
    resolver: zodResolver(schema),
  });

  const handleSave = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <form onSubmit={handleSave} className="w-full grid">
      <div className="w-full grid sm:grid-cols-[200px_1fr] md:flex md:justify-center  gap-10">
        <label
          className="border-[4px] border-blue-600 rounded-full overflow-hidden w-[200px] h-[200px] md:min-w-[250px] md:min-h-[250px] justify-self-center sm:justify-self-end p-3 flex justify-center items-center el__flow hover:text-gray-500 cursor-pointer group el__flow"
          onMouseEnter={(e) => e.currentTarget.classList.add("el__shadow")}
          onMouseLeave={(e) => e.currentTarget.classList.remove("el__shadow")}
        >
          {/* <img src="" alt="" /> */}
          <input type="file" className="h-0 w-0 opacity-0" />
          <User className="w-[200px] h-[200px] group-hover:scale-90 el__flow" />
        </label>

        <div className="w-full sm:self-center justify-self-center grid items-start gap-5 sm:gap-8 h-fit sm:max-w-[500px]">
          {fieldsProfileHeader.map((el) => (
            <FormFieldBtn key={el.id} {...{ register, errors, setFocus, el }} />
          ))}

          {/* {FieldHeaderFooter.map((el) => (
          <div className="w-[300px] justify-self-center lg:justify-self-start">
            <ButtonIcon key={el.id} {...{ el }} />
          </div>
        ))} */}
        </div>
      </div>
    </form>
  );
};
export default UserProfile;
