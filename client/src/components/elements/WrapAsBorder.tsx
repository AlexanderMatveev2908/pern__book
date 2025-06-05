import type { FC } from "react";

type PropsType = {
  children: React.ReactNode;
  customStyle?: string;
};

const WrapAsBorder: FC<PropsType> = ({ children, customStyle }) => {
  return (
    <div
      className={`w-full grid grid-cols-1 p-4 border-[3px] rounded-xl border-blue-600 justify-items-center ${
        customStyle ?? "gap-y-5"
      }`}
    >
      {children}
    </div>
  );
};

export default WrapAsBorder;
