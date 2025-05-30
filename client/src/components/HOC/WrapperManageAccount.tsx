import { FC, ReactNode } from "react";
import Title from "../elements/Title";

type PropsType = {
  isIn: boolean;
  title: string;
  children: ReactNode;
};

const WrapperManageAccount: FC<PropsType> = ({ isIn, title, children }) => {
  return (
    <div
      className={`w-full grid grid-cols-1 justify-items-center gap-5 h-fit transition-all duration-300 ${
        isIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <Title {...{ title, styleTxt: "txt__4" }} />
      {children}
    </div>
  );
};
export default WrapperManageAccount;
