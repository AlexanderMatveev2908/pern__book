/* eslint-disable @typescript-eslint/no-explicit-any */
import FormFieldBtn from "@/components/forms/components/inputs/FormFieldBtn";
import { fieldsProfileHeader } from "@/config/fields/fields";
import { getData, isObjOk, schemaEmail, schemaNames } from "@/lib/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useGetUserProfileQuery } from "../userSliceAPI";
import { WrapPageAPI } from "@/components/components";
import { UserType } from "@/types/types";

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
    watch,
    getValues,
    setValue,
  } = useForm<UserFormType>({
    resolver: zodResolver(schema),
  });

  const { data, isLoading, error, isError } = useGetUserProfileQuery({}) ?? {};
  const user: UserType = getData(data, "user");

  useEffect(() => {
    const updateForm = () => {
      const fields = getValues();
      if (isObjOk(user)) {
        for (const key in fields) {
          if (user[key as keyof UserType] !== undefined) {
            setValue(key as keyof UserFormType, (user as any)[key] ?? "");
          }
        }
      }
    };
    updateForm();
  }, [user, getValues, setValue]);

  const handleSave = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <WrapPageAPI {...{ isLoading, isError, error }}>
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
              <FormFieldBtn
                key={el.id}
                {...{ register, errors, setFocus, el }}
              />
            ))}

            {/* {FieldHeaderFooter.map((el) => (
          <div className="w-[300px] justify-self-center lg:justify-self-start">
            <ButtonIcon key={el.id} {...{ el }} />
          </div>
        ))} */}
          </div>
        </div>
      </form>
    </WrapPageAPI>
  );
};
export default UserProfile;
