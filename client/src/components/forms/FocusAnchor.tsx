/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

type PropsType = {
  fieldKey: string;
  register: UseFormRegister<any>;
};

const FocusAnchor: FC<PropsType> = ({ fieldKey, register }) => {
  return (
    <input
      type="text"
      className="absolute top-0 left-0 opacity-0 max-h-0 max-w-0"
      {...register(fieldKey + "_a")}
    />
  );
};

export default FocusAnchor;
