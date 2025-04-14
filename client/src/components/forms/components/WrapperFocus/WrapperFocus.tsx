/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import PwdField from "../inputs/PwdField/PwdField";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormFieldBasic } from "../../../../types/types.ts";
import CheckRegPwd from "./CheckRegPwd";

type PropsType = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  pwd: string | null;
  mainPwd: {
    isPwd: boolean;
    handleClick: () => void;
  };
  el: FormFieldBasic;
};

const WrapperFocus: FC<PropsType> = ({
  register,
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
          register,
          errors,
          ...mainPwd,
          setFocus,
        }}
      />

      <CheckRegPwd {...{ pwd, focus }} />
    </div>
  );
};
export default WrapperFocus;
