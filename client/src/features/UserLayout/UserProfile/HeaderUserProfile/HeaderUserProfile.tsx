import FormFieldBtn from "@/components/forms/components/inputs/FormFieldBtn/FormFieldBtn";
import { fieldsProfileHeader } from "@/config/fields/fields";
import { UserType } from "@/types/types";
import { User } from "lucide-react";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import my_thumb from "../../../../config/assetsDev/thumb/thumb.avif";

type PropsType = {
  user: UserType;
};

const HeaderUserProfile: FC<PropsType> = ({ user }) => {
  const formCtx = useFormContext();
  const {
    register,
    formState: { errors },
    setFocus,
    setValue,
    clearErrors,
  } = formCtx;

  return (
    <div className="w-full grid sm:grid-cols-[200px_1fr] md:flex md:justify-center  gap-10">
      <label
        className="border-[4px] border-blue-600 rounded-full overflow-hidden w-[200px] h-[200px] md:min-w-[250px] md:min-h-[250px] justify-self-center sm:justify-self-end p-3 flex justify-center items-center el__flow hover:text-gray-500 cursor-pointer group el__flow"
        onMouseEnter={(e) => e.currentTarget.classList.add("el__shadow")}
        onMouseLeave={(e) => e.currentTarget.classList.remove("el__shadow")}
      >
        <input type="file" className="h-0 w-0 opacity-0" />
        {/* <img
          src={my_thumb}
          alt=""
          className="w-[100%] h-[100%] object-cover rounded-full"
        /> */}
        <User className="w-[200px] h-[200px] group-hover:scale-90 el__flow" />
      </label>

      <div className="w-full sm:self-center justify-self-center grid items-start gap-5 sm:gap-8 h-fit sm:max-w-[500px]">
        {fieldsProfileHeader.map((el) => (
          <FormFieldBtn
            key={el.id}
            {...{
              register,
              errors,
              setFocus,
              setValue,
              user,
              el,
              clearErrors,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default HeaderUserProfile;
