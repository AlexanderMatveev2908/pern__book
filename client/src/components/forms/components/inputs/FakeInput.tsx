/* eslint-disable @typescript-eslint/no-explicit-any */
import { capt } from "@/lib/lib";
import { FormBaseProps, FormFieldBasic } from "@/types/types";
import { Pencil } from "lucide-react";
import { FC } from "react";

type PropsType = {
  el: FormFieldBasic;
  handleClick: () => any;
} & Omit<FormBaseProps, "errors">;

const FakeInput: FC<PropsType> = ({ el, handleClick, register }) => {
  return (
    <div className="w-full h-fit flex items-center gap-5">
      <label className="w-full h-fit flex items-center">
        <input
          className={`w-full appearance-none el__flow outline-0 py-2 px-3 rounded-xl border-2  el__focus txt__2 border-blue-600 ${"opacity-75"}`}
          placeholder={el?.place ?? `Your ${capt(el.field)}...`}
          {...register(el.field)}
        />
      </label>

      <button
        onClick={handleClick}
        className="appearance-none outline-0 rounded-xl btn__logic_sm cursor-pointer group"
      >
        <Pencil className="icon__sm el__flow group-hover:text-blue-600" />
      </button>
    </div>
  );
};
export default FakeInput;
