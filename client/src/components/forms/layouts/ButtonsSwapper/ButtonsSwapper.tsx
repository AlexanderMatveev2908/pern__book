import { FC, ReactNode } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import s from "./ButtonsSwapper.module.css";

type PropsType = {
  currForm: number;
  setCurrForm: (val: number) => void;
  totLen: number;
  isNextDisabled: boolean;
  children?: ReactNode;
  aria?: string[];
};

const ButtonsSwapper: FC<PropsType> = ({
  currForm,
  setCurrForm,
  totLen,
  children,
  isNextDisabled,
  aria,
}) => {
  return (
    <div className="w-full grid grid-cols-[50px_1fr_50px] items-center">
      <button
        type="button"
        aria-label={aria?.[0] ?? "prev"}
        onClick={() => {
          if (currForm) setCurrForm(currForm - 1);
        }}
        disabled={!currForm}
        className={`${s.button_swapper} justify-self-start ${
          currForm ? "group" : ""
        }`}
      >
        <FaChevronLeft className="icon__sm icon__with_txt" />
      </button>

      {/* IPHOTETIC MAIN BTN TI DO IMPORTANT THINGS, I USED IT FOR REGISTER OFR EXAMPLE  */}
      {currForm === totLen - 1 && children ? (
        <div
          className={`w-full flex justify-center sm:col-span-1 ${
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
          aria-label={aria?.[1] ?? "next"}
          type="button"
          disabled={isNextDisabled}
          onClick={() => currForm < totLen - 1 && setCurrForm(currForm + 1)}
          className={`justify-self-end ${isNextDisabled ? "" : "group"} ${
            s.button_swapper
          }`}
        >
          <FaChevronRight className="icon__sm icon__with_txt" />
        </button>
      )}
    </div>
  );
};
export default ButtonsSwapper;
