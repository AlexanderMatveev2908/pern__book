/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormFieldBasic } from "@/types/types";
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PwdField } from "@/components/components";
import WrapperFocus from "./components/WrapperFocus";
import CreatePwd from "./components/CreatePwd";

type PropsType = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
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
};

const PairPwd: FC<PropsType> = ({
  register,
  errors,
  fields,
  pwd,
  mainPwd,
  confirmPwd,
}) => {
  return (
    <>
      {fields.map((el, i) =>
        !i ? (
          <WrapperFocus
            key={el.id}
            {...{ mainPwd, pwd, register, errors, el }}
          />
        ) : (
          <PwdField key={el.id} {...{ register, errors, el, ...confirmPwd }} />
        )
      )}

      <CreatePwd />
    </>
  );
};
export default PairPwd;
