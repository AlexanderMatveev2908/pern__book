import type { FC } from "react";

type PropsType = {
  txt?: string;
};

const OptionalField: FC<PropsType> = ({ txt }) => {
  return (
    <div className="w-full flex justify-end">
      <span className="txt__2 border-b-[3px] border-green-600 pb-1">
        {txt ?? "🟢 Green fields are mandatory"}
      </span>
    </div>
  );
};

export default OptionalField;
