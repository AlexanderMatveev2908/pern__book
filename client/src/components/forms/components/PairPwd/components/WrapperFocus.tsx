import { FC, useState } from "react";
import { FormBaseProps, FormFieldBasic } from "../../../../../types/types.ts";
import CheckRegPwd from "./CheckRegPwd.tsx";
import { PwdField } from "@/components/components.ts";

type PropsType = {
  pwd: string | null;
  mainPwd: {
    isPwd: boolean;
    handleClick: () => void;
  };
  el: FormFieldBasic;
} & FormBaseProps;

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
