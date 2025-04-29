import { FormBaseProps, FormFieldBasic } from "@/types/types";
import { FC } from "react";
import WrapperFocus from "./components/WrapperFocus";
import CreatePwd from "./components/CreatePwd";
import PwdField from "../inputs/PwdField/PwdField";

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
} & FormBaseProps;

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
