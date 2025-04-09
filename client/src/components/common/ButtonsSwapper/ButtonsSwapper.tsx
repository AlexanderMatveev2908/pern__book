import { FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import style from "./ButtonsSwapper.module.css";

type PropsType = {
  currForm: number;
  setCurrForm: React.Dispatch<React.SetStateAction<number>>;
  totLen: number;
};

const ButtonsSwapper: FC<PropsType> = ({ currForm, setCurrForm, totLen }) => {
  return (
    <div className="w-full grid grid-cols-2 items-center">
      <button
        onClick={() => currForm && setCurrForm((prev) => prev - 1)}
        disabled={!currForm}
        className={`btn__clear justify-self-start ${currForm ? "group" : ""} ${
          style.btn__swapper
        }`}
      >
        <FaChevronLeft className="icon__sm icon__with_txt" />
      </button>

      <button
        onClick={() => currForm < totLen - 1 && setCurrForm((prev) => prev + 1)}
        className={`btn__clear justify-self-end group ${style.btn__swapper}`}
      >
        <FaChevronRight className="icon__sm icon__with_txt" />
      </button>
    </div>
  );
};
export default ButtonsSwapper;
