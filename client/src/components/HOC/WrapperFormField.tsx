import { FC, ReactNode } from "react";
import { Title } from "../components";

type PropsType = {
  title: string;
  children: ReactNode;
  sizeStyle?: string;
};

const WrapperFormField: FC<PropsType> = ({ title, children, sizeStyle }) => {
  return (
    <div className="w-full grid gap-3">
      <Title
        {...{
          title,
          styleTxt: "txt__3",
          styleParent: "justify-start",
        }}
      />
      <div className={`w-full flex ${sizeStyle ?? "max-w-full"}`}>
        {children}
      </div>
    </div>
  );
};

export default WrapperFormField;
