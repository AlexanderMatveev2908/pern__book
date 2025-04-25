import { FC, ReactNode } from "react";
import Title from "../common/Title";
import SwitcherFormAuth from "../forms/components/SwitcherFormAuth";

type PropsType = {
  title: string;
  children: ReactNode;
  switchForm?: boolean;
};

const WrapperAuthPage: FC<PropsType> = ({
  children,
  title,
  switchForm = true,
}) => {
  return (
    <div className="parent__page">
      <Title {...{ title }} />
      {children}
      {switchForm && <SwitcherFormAuth />}
    </div>
  );
};
export default WrapperAuthPage;
