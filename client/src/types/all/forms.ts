/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldErrors, UseFormRegister } from "react-hook-form";

export type FormBaseProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
};
