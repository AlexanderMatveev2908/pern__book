import { clampBy } from "@/core/lib/lib";
import { FC } from "react";

type PropsType = {
  title?: string;
  styleTxt?: string;
  styleParent?: string;
};

const Title: FC<PropsType> = ({ title, styleTxt, styleParent }) => {
  return (
    <div className={`w-full flex ${styleParent ?? "justify-center"}`}>
      <h1 className={`${styleTxt ?? "txt__5 clamp_txt"}`} {...clampBy(2)}>
        {typeof title === "string"
          ? title.toUpperCase()
          : "I lost a title, do u see it ? 🥸"}
      </h1>
    </div>
  );
};
export default Title;
