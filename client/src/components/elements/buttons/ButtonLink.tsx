import { BtnIconLinkType } from "@/types/types";
import type { FC } from "react";
import { Link } from "react-router-dom";

type PropsType = {
  el: BtnIconLinkType;
  customStyle?: string;
};

const ButtonLink: FC<PropsType> = ({ el, customStyle }) => {
  return (
    <Link
      to={el.path}
      className={`w-full border-2 rounded-xl flex justify-center gap-5 max-w-[250px] py-2 btn_link hover:text-white ${
        customStyle ?? "border-blue-600 hover:bg-blue-600 "
      }`}
    >
      {el?.icon && <el.icon className="icon__sm" />}

      <span className="txt__3">{el.label}</span>
    </Link>
  );
};

export default ButtonLink;
