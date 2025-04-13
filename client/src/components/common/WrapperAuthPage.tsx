import { FC, ReactNode } from "react";
import Title from "./Title";
import SwitcherFormAuth from "../forms/components/SwitcherFormAuth";

type PropsType = {
  title: string;
  children: ReactNode;
};

const WrapperAuthPage: FC<PropsType> = ({ children, title }) => {
  return (
    <div className="parent__page">
      <Title {...{ title }} />
      {children}
      <SwitcherFormAuth />
    </div>
  );
};
export default WrapperAuthPage;
