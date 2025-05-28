/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormFieldBasic } from "@/types/types";
import { FC } from "react";
import WrapperFocus from "./components/WrapperFocus";
import CreatePwd from "./components/CreatePwd";
import PwdField from "../../inputs/PwdField/PwdField";
import { Control, FieldErrors } from "react-hook-form";

type PropsType = {
  fields: FormFieldBasic[];
  pwd: string | null;
  mainPwd: {
    isPwd: boolean;
    handleClick: () => void;
  };
  confirmPwd: {
    isPwd: boolean;
    handleClick: () => void;
  };
  errors: FieldErrors;
  control: Control<any>;
  customCbs: ((val: any) => void)[];
};

const PairPwd: FC<PropsType> = ({
  control,
  errors,
  fields,
  pwd,
  mainPwd,
  confirmPwd,
  customCbs,
}) => {
  return (
    <>
      {fields.map((el, i) =>
        !i ? (
          <WrapperFocus
            key={el.id}
            {...{ mainPwd, pwd, control, customCB: customCbs[i], errors, el }}
          />
        ) : (
          <PwdField
            key={el.id}
            {...{ control, customCB: customCbs[i], errors, el, ...confirmPwd }}
          />
        )
      )}
      <CreatePwd />
    </>
  );
};
export default PairPwd;
