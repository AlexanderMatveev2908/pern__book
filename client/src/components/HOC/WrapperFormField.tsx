import { FC, ReactNode } from "react";
import { Title } from "../components";

type PropsType = {
  title: string;
  children: ReactNode;
};

const WrapperFormField: FC<PropsType> = ({ title, children }) => {
  return (
    <div className="w-full grid gap-3">
      <Title
        {...{
          title,
          styleTxt: "txt__3",
          styleParent: "justify-start",
        }}
      />
      <div className="w-full flex max-w-[500px] lg:max-w-1/2">{children}</div>
    </div>
  );
};

export default WrapperFormField;
