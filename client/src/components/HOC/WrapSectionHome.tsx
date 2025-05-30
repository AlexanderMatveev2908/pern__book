import type { FC, ReactNode } from "react";
import Title from "../elements/Title";

type PropsType = {
  title: string;
  children: ReactNode;
  len?: number;
};

const WrapSectionHome: FC<PropsType> = ({ title, children, len }) => {
  return (len ?? 0) < 4 ? null : (
    <div className="w-full grid grid-cols-1 gap-5">
      <Title {...{ title }} />
      {children}
    </div>
  );
};

export default WrapSectionHome;
