import type { FC } from "react";

type PropsType = {
  children: React.ReactNode;
  h?: number;
};

const WrapBg: FC<PropsType> = ({ children, h }) => {
  return (
    <div
      className="w-full absolute bottom-0 bg-black/90 rounded-xl"
      style={{
        height: `${h ?? 40}px`,
      }}
    >
      <div className="w-full flex justify-center h-full items-center">
        {children}
      </div>
    </div>
  );
};

export default WrapBg;
