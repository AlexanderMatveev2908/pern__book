/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonIcon from "@/components/common/buttons/ButtonIcon/ButtonIcon";
import MapsBtn from "@/components/common/buttons/MapsBtn/MapsBtn";
import QuickFillBtn from "@/components/common/buttons/QuickFillBtn";
import {
  BreadCrumbForm,
  ButtonsSwapper,
  FormField,
  Title,
} from "@/components/components";
import {
  fieldsProfileAddress_0,
  fieldsProfileAddress_1,
  swapAddressFieldsMerg,
} from "@/config/fields/UserLayout/fieldsProfile";
import {
  BtnAct,
  FormBaseProps,
  FormSettersProps,
  SwapFormPropsType,
} from "@/types/types";
import { Eraser } from "lucide-react";
import { FC, useMemo } from "react";
import { UseFormClearErrors } from "react-hook-form";

const clearBtnField = {
  label: "Clear",
  icon: Eraser,
};

type PropsType = FormBaseProps &
  SwapFormPropsType &
  Omit<FormSettersProps, "watch"> & {
    clearErrors: UseFormClearErrors<any>;
    swapID: string;
    btnProfile?: boolean;
    includePhone?: boolean;
  };

const AddressForm: FC<PropsType> = ({
  register,
  clearErrors,
  setValue,
  errors,
  currForm,
  setCurrForm,
  swapID,
  btnProfile,
  includePhone = true,
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

  const fieldsProfileAddressFiltered_1 = useMemo(
    () =>
      fieldsProfileAddress_1.filter((el) =>
        includePhone ? el.field !== "includePhone" : el
      ),
    [includePhone]
  );

  return (
    <div className="w-full grid gap-8">
      <Title {...{ title: "my address", styleTxt: "txt__4" }} />

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
              {fieldsProfileAddressFiltered_1.map((el) => (
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
                  handleClick: handleClear,
                }}
              />
            </div>
          </ButtonsSwapper>
        </div>
      </div>

      <div className="form__size w-full justify-self-center grid grid-cols-1 sm:grid-cols-2 gap-5 justify-items-center">
        <div className="w-[275px]">
          <MapsBtn {...{ setValue }} />
        </div>
        {btnProfile && (
          <div className="w-[275px]">
            <QuickFillBtn {...{ setValue }} />
          </div>
        )}
      </div>
    </div>
  );
};
export default AddressForm;
