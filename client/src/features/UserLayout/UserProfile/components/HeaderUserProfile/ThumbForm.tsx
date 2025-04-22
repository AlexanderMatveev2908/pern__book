/* eslint-disable @typescript-eslint/no-explicit-any */
import TooltipBtn from "@/components/common/buttons/TooltipBtn";
import { useSavePrevErr } from "@/hooks/hooks";
import { isObjOk } from "@/lib/lib";
import { FormBaseProps } from "@/types/types";
import { Trash2, User } from "lucide-react";
import { FC } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

type PropsType = {
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
} & FormBaseProps;

const ThumbForm: FC<PropsType> = ({ register, watch, errors, setValue }) => {
  const { prevErr } = useSavePrevErr(errors, "Thumb");

  const thumb = watch("Thumb") as FileList;

  //   [...(watch("Thumb")?.length ? watch("Thumb") : [])].map((el) =>
  //     console.log(el)
  //   );

  console.log(watch("Thumb"));

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
          {...register("Thumb")}
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

      <div
        className={`absolute -top-[20%] right-0 w-fit transition-all duration-500 pointer-events-none ${
          errors?.Thumb?.message
            ? "translate-y-0 opacity-100"
            : "translate-y-[50px] opacity-0"
        }`}
      >
        <div className="bg-[#000] py-1 px-3 border-2 border-red-600 rounded-xl z-60 relative h-fit">
          <span className="txt__1 text-red-600">
            {(errors?.Thumb?.message as string) || prevErr}
          </span>

          <div className="absolute w-[30px] h-[30px] right-[25px] top-[90%] overflow-hidden z-60">
            <div className="w-[30px] h-[30px] border-2 border-red-600 bg-[#000] rotate-45 absolute top-[-15px] left-0"></div>
          </div>
        </div>
      </div>

      {!!thumb?.length && (
        <TooltipBtn
          {...{
            handleClick: () => setValue("Thumb", "", { shouldValidate: true }),
          }}
        />
      )}
    </div>
  );
};
export default ThumbForm;
