/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import CheckRegPwd from "./CheckRegPwd.tsx";
import { FormFieldBasic } from "@/types/types.ts";
import PwdField from "@/components/forms/inputs/PwdField/PwdField.tsx";
import { Control, FieldErrors } from "react-hook-form";

type PropsType = {
  pwd: string | null;
  mainPwd: {
    isPwd: boolean;
    handleClick: () => void;
  };
  el: FormFieldBasic;
  errors: FieldErrors;
  control: Control<any>;
  customCB: (val: any) => void;
};

const WrapperFocus: FC<PropsType> = ({
  control,
  customCB,
  errors,
  mainPwd,
  pwd,
  el,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className="w-full relative">
      <PwdField
        {...{
          el,
          control,
          errors,
          ...mainPwd,
          setFocus,
          customCB,
        }}
      />

      <CheckRegPwd {...{ pwd, focus }} />
    </div>
  );
};
export default WrapperFocus;
