import { FC } from "react";

type PropsType = {
  title: string;
};

const Title: FC<PropsType> = ({ title }) => {
  return (
    <div className="w-full flex justify-center">
      <h1 className="txt__5">{title}</h1>
    </div>
  );
};
export default Title;
