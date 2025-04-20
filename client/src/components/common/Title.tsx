import { FC } from "react";

type PropsType = {
  title: string;
  customStyle?: string;
};

const Title: FC<PropsType> = ({ title, customStyle }) => {
  return (
    <div className="w-full flex justify-center txt__col">
      <h1 className={`${customStyle ?? "txt__5"}`}>{title.toUpperCase()}</h1>
    </div>
  );
};
export default Title;
