import type { FC } from "react";

type PropsType = {
  txt?: string;
};

const OptionalField: FC<PropsType> = ({ txt }) => {
  return (
    <div className="w-full flex justify-end">
      <span className="txt__1 border-b-[3px] border-blue-600 pb-1">
        {txt ?? "Fields with ~ near name are opti"}onal
      </span>
    </div>
  );
};

export default OptionalField;
