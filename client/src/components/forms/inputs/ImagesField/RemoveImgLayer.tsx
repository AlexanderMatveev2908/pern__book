/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

type PropsType = {
  handleClick: (arg: any) => void;
};

const RemoveImgLayer: FC<PropsType> = ({ handleClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      className={`absolute appearance-none outline-0 inset-0 bg-black/70 flex justify-center items-center transition-all duration-300 cursor-pointer ${
        hover ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`flex gap-5 items-center transition-all duration-[0.4s] text-red-600 ${
          hover ? "" : "scale-0"
        }`}
      >
        <FaTrashAlt className="w-[35px] h-[35px]" />
        <span className="txt__3">Remove</span>
      </div>
    </button>
  );
};

export default RemoveImgLayer;
