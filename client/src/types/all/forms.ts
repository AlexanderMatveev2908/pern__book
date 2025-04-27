/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export type FormBaseProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
};

export type FormSettersProps = {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
};

export type SwapFormPropsType = {
  currForm: number;
  setCurrForm: (val: number) => void;
  isNextDisabled: boolean;
  setNextDisabled: (val: boolean) => void;
};
