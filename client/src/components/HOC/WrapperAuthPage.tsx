import { FC, ReactNode } from "react";
import Title from "../elements/Title";
import SwitcherFormAuth from "../../features/AuthLayout/components/SwitcherFormAuth";

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
    <div className="p_page">
      <Title {...{ title }} />
      {children}
      {switchForm && <SwitcherFormAuth />}
    </div>
  );
};
export default WrapperAuthPage;
