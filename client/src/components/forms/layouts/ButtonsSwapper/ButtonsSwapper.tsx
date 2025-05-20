import { FC, ReactNode } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import style from "./ButtonsSwapper.module.css";

type PropsType = {
  currForm: number;
  setCurrForm: (val: number) => void;
  totLen: number;
  isNextDisabled: boolean;
  children?: ReactNode;
};

const ButtonsSwapper: FC<PropsType> = ({
  currForm,
  setCurrForm,
  totLen,
  children,
  isNextDisabled,
}) => {
  return (
    <div className="w-full grid grid-cols-[50px_1fr_50px] items-center">
      <button
        type="button"
        onClick={() => {
          if (currForm) setCurrForm(currForm - 1);
        }}
        disabled={!currForm}
        className={`justify-self-start ${currForm ? "group" : ""} ${
          style.button_swapper__btn__swapper
        }`}
      >
        <FaChevronLeft className="icon__sm icon__with_txt" />
      </button>

      {/* IPHOTETIC MAIN BTN TI DO IMPORTANT THINGS, I USED IT FOR REGISTER OFR EXAMPLE  */}
      {currForm === totLen - 1 && children ? (
        <div
          className={`w-full justify-center sm:col-span-1 ${
            currForm === totLen - 1 ? "col-span-2 sm:col-span-1" : ""
          }`}
        >
          {children}
        </div>
      ) : (
        <div></div>
      )}

      {currForm === totLen - 1 ? null : (
        <button
          type="button"
          disabled={isNextDisabled}
          onClick={() => currForm < totLen - 1 && setCurrForm(currForm + 1)}
          className={`justify-self-end ${isNextDisabled ? "" : "group"} ${
            style.button_swapper__btn__swapper
          }`}
        >
          <FaChevronRight className="icon__sm icon__with_txt" />
        </button>
      )}
    </div>
  );
};
export default ButtonsSwapper;
