import { BtnIconLinkType } from "@/types/types";
import type { FC } from "react";
import { Link } from "react-router-dom";

type PropsType = {
  el: BtnIconLinkType;
};

const ButtonLink: FC<PropsType> = ({ el }) => {
  return (
    <Link
      to={el.path}
      className="w-full border-2 border-blue-600 rounded-xl flex justify-center gap-5 max-w-[200px] py-2 btn_link hover:bg-blue-600 hover:text-white"
    >
      {el?.icon && <el.icon className="icon__sm" />}

      <span className="txt__3">{el.label}</span>
    </Link>
  );
};

export default ButtonLink;
