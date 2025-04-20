import { FieldHeaderFooter } from "@/config/fields/fields";
import { FC } from "react";

type PropsType = {
  el: FieldHeaderFooter;
};

const ButtonIcon: FC<PropsType> = ({ el }) => {
  return (
    <button className="w-full border-2 border-blue-600 rounded-xl py-2 px-4 opacity-75 cursor-pointer btn__logic_md hover:opacity-100 flex items-center gap-5 justify-center">
      <el.icon className="icon__sm" />

      <span className="txt__2">{el.label}</span>
    </button>
  );
};
export default ButtonIcon;
