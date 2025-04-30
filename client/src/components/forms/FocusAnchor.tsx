/* eslint-disable @typescript-eslint/no-explicit-any */
import { capt } from "@/core/lib/lib";
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
      {...register(fieldKey + capt("anchor"))}
    />
  );
};

export default FocusAnchor;
