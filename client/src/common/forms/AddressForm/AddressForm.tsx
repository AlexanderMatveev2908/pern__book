import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import MapsBtn from "@/components/elements/buttons/MapsBtn/MapsBtn";
import QuickFillBtn from "@/components/elements/buttons/QuickFillBtn";
import ButtonsSwapper from "@/components/forms/layouts/ButtonsSwapper/ButtonsSwapper";
import FormField from "@/components/forms/inputs/baseTxtFields/FormField";
import { useFormSwap } from "@/core/hooks/all/forms/useSwapForm/useSwapForm";
import { BtnAct, FormFieldBasic } from "@/types/types";
import { FC, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";
import { clearBtnField } from "@/core/config/fieldsData/labels/shared";

type PropsType = {
  swapID: string;
  btnProfile?: boolean;
  arrAddressSwap: FormFieldBasic[][];
  isDisabled?: boolean;
};

const AddressForm: FC<PropsType> = ({
  swapID,
  btnProfile,
  isDisabled,
  arrAddressSwap,
}) => {
  const {
    control,
    formState: { errors },
    clearErrors,
    setValue,
    watch,
  } = useFormContext();

  const { currForm, setCurrForm, isNextDisabled } = useFormSwap({
    ...useSwapCtxConsumer(),
    watch,
    errors,
    fields: arrAddressSwap,
  });

  const handleClear = () => {
    let i = arrAddressSwap.length - 1;

    do {
      const curr = arrAddressSwap[i];
      let j = curr.length - 1;

      do {
        setValue(curr[j].field, "");
        clearErrors(curr[j].field);

        j--;
      } while (j >= 0);

      i--;
    } while (i >= 0);

    setCurrForm(0);
  };

  const keysUser = useMemo(
    () => arrAddressSwap.flatMap((el) => el.map((el) => el.field)),
    [arrAddressSwap]
  );

  return (
    <div className="w-full grid gap-8">
      <div id={swapID} className="p_form__2 justify-self-center">
        <div className="w-full overflow-hidden p-6">
          <div
            className={`w-[200%] flex transition-all duration-500 ${
              !currForm
                ? "max-h-[300px] min-h-[300px]"
                : arrAddressSwap[1].length > 2
                ? "max-h-[350px] min-h-[350px]"
                : "max-h-[225px] min-h-[225px]"
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
              {arrAddressSwap[0].map((el) => (
                <FormField
                  key={el.id}
                  {...{ el, control, errors, isDisabled }}
                />
              ))}
            </div>

            <div
              className={`w-full grid gap-5 items-start h-fit el__flow ${
                !currForm ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {arrAddressSwap[1].map((el) => (
                <FormField
                  key={el.id}
                  {...{ el, control, errors, isDisabled }}
                />
              ))}
            </div>
          </div>
          <ButtonsSwapper
            {...{
              currForm,
              setCurrForm,
              totLen: 2,
              isNextDisabled: isDisabled ? false : isNextDisabled,
              // isNextDisabled,
            }}
          >
            {!isDisabled && (
              <div className="w-[200px] justify-self-center">
                <ButtonIcon
                  {...{
                    el: clearBtnField,
                    act: BtnAct.DEL,
                    handleClick: handleClear,
                  }}
                />
              </div>
            )}
          </ButtonsSwapper>
        </div>
      </div>

      {!isDisabled && (
        <div
          className="form__size w-full justify-self-center grid gap-5 justify-items-center"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          <div className="w-[250px]">
            <MapsBtn {...{ setValue }} />
          </div>
          {btnProfile && (
            <div className="w-[250px]">
              <QuickFillBtn {...{ setValue, keysUser }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default AddressForm;

/*
  const isPhoneIn = useMemo(() => {
    let isIn = false;
    let i = arrAddressSwap.length - 1;

    do {
      const currArr = arrAddressSwap[i];
      let j = currArr.length - 1;

      do {
        const curr = currArr[j];
        if (curr.field === "phone") {
          isIn = true;
          break;
        }

        j--;
      } while (j >= 0);
      if (isIn) break;

      i--;
    } while (i >= 0);

    return isIn;
  }, [arrAddressSwap]);
  */
