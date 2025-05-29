import type { FC, ReactNode } from "react";
import Title from "../elements/Title";

type PropsType = {
  title: string;
  children: ReactNode;
};

const WrapSectionHome: FC<PropsType> = ({ title, children }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-5">
      <Title {...{ title }} />
      {children}
    </div>
  );
};

export default WrapSectionHome;
