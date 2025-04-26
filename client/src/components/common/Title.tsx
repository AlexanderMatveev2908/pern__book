import { FC } from "react";

type PropsType = {
  title: string;
  styleTxt?: string;
  styleParent?: string;
};

const Title: FC<PropsType> = ({ title, styleTxt, styleParent }) => {
  return (
    <div className={`w-full flex ${styleParent ?? "justify-center"}`}>
      <h1 className={`${styleTxt ?? "txt__5"}`}>{title.toUpperCase()}</h1>
    </div>
  );
};
export default Title;
