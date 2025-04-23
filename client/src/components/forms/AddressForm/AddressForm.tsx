/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonIcon from "@/components/common/buttons/ButtonIcon/ButtonIcon";
import {
  BreadCrumbForm,
  ButtonsSwapper,
  FormField,
  Title,
} from "@/components/components";
import { clearBtnField } from "@/config/fields/general/btns";
import {
  fieldsProfileAddress_0,
  fieldsProfileAddress_1,
  swapAddressFieldsMerg,
} from "@/config/fields/UserLayout/fieldsProfile";
import { BtnAct, FormBaseProps, SwapFormPropsType } from "@/types/types";
import { FC } from "react";
import { UseFormClearErrors, UseFormSetValue } from "react-hook-form";

type PropsType = FormBaseProps &
  SwapFormPropsType & {
    clearErrors: UseFormClearErrors<any>;
    setValue: UseFormSetValue<any>;
    swapID: string;
  };

const AddressForm: FC<PropsType> = ({
  register,
  clearErrors,
  setValue,
  errors,
  currForm,
  setCurrForm,
  swapID,
}) => {
  const handleClear = () => {
    let i = swapAddressFieldsMerg.length - 1;

    do {
      setValue(swapAddressFieldsMerg[i], "");
      clearErrors(swapAddressFieldsMerg[i]);

      i--;
    } while (i >= 0);

    setCurrForm(0);
  };

  return (
    <div className="w-full grid gap-10">
      <Title {...{ title: "my address", customStyle: "txt__4" }} />

      <div className="w-full flex justify-center">
        <BreadCrumbForm {...{ currForm, totLen: 2 }} />
      </div>

      <div id={swapID} className="form__content justify-self-center">
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
            {...{
              currForm,
              setCurrForm,
              totLen: 2,
              isNextDisabled: false,
            }}
          >
            <div className="w-[200px] justify-self-center">
              <ButtonIcon
                {...{
                  el: clearBtnField,
                  act: BtnAct.DEL,
                  handleCLick: handleClear,
                }}
              />
            </div>
          </ButtonsSwapper>
        </div>
      </div>
    </div>
  );
};
export default AddressForm;
