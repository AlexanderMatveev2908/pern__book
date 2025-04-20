import FormFieldBtn from "@/components/forms/components/inputs/FormFieldBtn";
import { fieldsProfileHeader } from "@/config/fields/fields";
import { schemaNames } from "@/lib/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  ...schemaNames(),
});

type UserFormType = z.infer<typeof schema>;

const UserProfile: FC = () => {
  const {
    register,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="w-full grid sm:grid-cols-2">
      <label className="border-[4px] border-blue-600 rounded-full overflow-hidden w-[200px] h-[200px] justify-self-center sm:justify-self-start p-3 flex justify-center items-center el__flow hover:text-gray-500 cursor-pointer group">
        {/* <img src="" alt="" /> */}
        <input type="file" className="h-0 w-0 opacity-0" />
        <User className="w-[200px] h-[200px] group-hover:scale-90 el__flow" />
      </label>

      <div className="w-full grid">
        {fieldsProfileHeader.map((el) => (
          <FormFieldBtn key={el.id} {...{ register, errors, el }} />
        ))}
      </div>
    </div>
  );
};
export default UserProfile;
