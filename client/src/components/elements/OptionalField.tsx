import type { FC } from "react";

const OptionalField: FC = () => {
  return (
    <div className="w-full flex justify-end">
      <span className="txt__1 border-b-[3px] border-blue-600 pb-1">
        Fields with ~ near name are optional
      </span>
    </div>
  );
};

export default OptionalField;
