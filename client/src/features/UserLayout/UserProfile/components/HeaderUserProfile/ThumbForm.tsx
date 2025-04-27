/* eslint-disable @typescript-eslint/no-explicit-any */
import TooltipBtn from "@/components/common/buttons/TooltipBtn";
import { ErrorFormField } from "@/components/components";
import { isObjOk } from "@/lib/lib";
import { FormBaseProps, FormSettersProps } from "@/types/types";
import { Trash2, User } from "lucide-react";
import { FC } from "react";

type PropsType = {} & FormBaseProps & FormSettersProps;

const ThumbForm: FC<PropsType> = ({ register, watch, errors, setValue }) => {
  const thumb = watch("thumb") as FileList;

  //   [...(watch("thumb")?.length ? watch("thumb") : [])].map((el) =>
  //     console.log(el)
  //   );

  return (
    <div className="w-fit grid relative">
      <label
        className="border-[4px] border-blue-600 rounded-full overflow-hidden w-[200px] h-[200px] md:min-w-[250px] md:min-h-[250px] justify-self-center sm:justify-self-end p-3 flex justify-center items-center el__flow hover:text-gray-500 cursor-pointer group el__flow"
        onMouseEnter={(e) => e.currentTarget.classList.add("el__shadow")}
        onMouseLeave={(e) => e.currentTarget.classList.remove("el__shadow")}
      >
        <input
          type="file"
          className="h-0 w-0 opacity-0"
          {...register("thumb")}
        />
        {isObjOk(thumb?.[0]) || thumb?.length ? (
          <img
            src={
              thumb instanceof FileList
                ? URL.createObjectURL(thumb?.[0] as File)
                : (thumb as string)
            }
            alt=""
            className="w-[100%] h-[100%] object-cover rounded-full"
          />
        ) : (
          <User className="w-[200px] h-[200px] group-hover:scale-90 el__flow" />
        )}
      </label>

      <ErrorFormField
        {...{
          errors,
          styleCont: "-top-[15%] right-0",
          styleTool: "top-[120%]",
          el: { field: "thumb" },
        }}
      />

      {!!thumb?.length && (
        <TooltipBtn
          {...{
            el: {
              icon: Trash2,
              label: "Remove thumb",
            },
            handleClick: () => setValue("thumb", "", { shouldValidate: true }),
          }}
        />
      )}
    </div>
  );
};
export default ThumbForm;
