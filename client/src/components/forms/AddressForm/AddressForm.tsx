import {
  BreadCrumbForm,
  ButtonsSwapper,
  FormField,
  Title,
} from "@/components/components";
import {
  fieldsProfileAddress_0,
  fieldsProfileAddress_1,
} from "@/config/fields/fields";
import { FormBaseProps } from "@/types/types";
import { FC } from "react";

type PropsType = FormBaseProps & {
  currForm: number;
  setCurrForm: (val: number) => void;
  isNextDisabled: boolean;
};

const AddressForm: FC<PropsType> = ({
  register,
  errors,
  currForm,
  setCurrForm,
  isNextDisabled,
}) => {
  return (
    <div className="w-full grid gap-10">
      <Title {...{ title: "my address", customStyle: "txt__4" }} />

      <div className="w-full flex justify-center">
        <BreadCrumbForm {...{ currForm, totLen: 2 }} />
      </div>

      <div className="form__content justify-self-center">
        <div className="w-full overflow-hidden p-6">
          <div
            className={`w-[200%] flex transition-all duration-500 ${
              !currForm
                ? "max-h-[300px] min-h-[300px]"
                : "max-h-[350px] min-h-[350px]"
            }`}
            style={{
              transform: `translateX(-${currForm * 50}%)`,
            }}
          >
            <div
              className={`w-full grid gap-5 items-start h-fit el__flow ${
                !currForm ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {fieldsProfileAddress_0.map((el) => (
                <FormField key={el.id} {...{ el, register, errors }} />
              ))}
            </div>

            <div
              className={`w-full grid gap-5 items-start h-fit el__flow ${
                !currForm ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {fieldsProfileAddress_1.map((el) => (
                <FormField key={el.id} {...{ el, register, errors }} />
              ))}
            </div>
          </div>
          <ButtonsSwapper
            {...{ currForm, setCurrForm, totLen: 2, isNextDisabled }}
          ></ButtonsSwapper>
        </div>
      </div>
    </div>
  );
};
export default AddressForm;
