import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import MapsBtn from "@/components/elements/buttons/MapsBtn/MapsBtn";
import QuickFillBtn from "@/components/elements/buttons/QuickFillBtn";
import ButtonsSwapper from "@/components/forms/ButtonsSwapper/ButtonsSwapper";
import FormField from "@/components/forms/inputs/FormFields/FormField";
import { useFormSwap } from "@/core/hooks/all/forms/useSwapForm";
import { BtnAct, FormFieldBasic } from "@/types/types";
import { Eraser } from "lucide-react";
import { FC, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";

const clearBtnField = {
  label: "Clear",
  icon: Eraser,
};

type PropsType = {
  swapID: string;
  btnProfile?: boolean;
  arrAddressSwap: FormFieldBasic[][];
};

const AddressForm: FC<PropsType> = ({ swapID, btnProfile, arrAddressSwap }) => {
  const {
    register,
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
      <div id={swapID} className="form__content justify-self-center">
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
                <FormField key={el.id} {...{ el, register, errors }} />
              ))}
            </div>

            <div
              className={`w-full grid gap-5 items-start h-fit el__flow ${
                !currForm ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {arrAddressSwap[1].map((el) => (
                <FormField key={el.id} {...{ el, register, errors }} />
              ))}
            </div>
          </div>
          <ButtonsSwapper
            {...{
              currForm,
              setCurrForm,
              totLen: 2,
              // isNextDisabled: false,
              isNextDisabled,
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
            <QuickFillBtn {...{ setValue, keysUser }} />
          </div>
        )}
      </div>
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
