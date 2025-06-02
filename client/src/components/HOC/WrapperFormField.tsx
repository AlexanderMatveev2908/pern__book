import { FC, ReactNode } from "react";
import Title from "../elements/Title";

type PropsType = {
  title: string;
  children: ReactNode;
  sizeStyle?: string;
  isDisabled?: boolean;
};

const WrapperFormField: FC<PropsType> = ({
  title,
  isDisabled,
  children,
  sizeStyle,
}) => {
  return (
    <div className={`w-full grid gap-4 ${isDisabled ? "opacity-50" : ""}`}>
      <Title
        {...{
          title,
          styleTxt: "txt__3",
          styleParent: "justify-start",
        }}
      />
      <div className={`w-full grid ${sizeStyle ?? "max-w-full"}`}>
        {children}
      </div>
    </div>
  );
};

export default WrapperFormField;
