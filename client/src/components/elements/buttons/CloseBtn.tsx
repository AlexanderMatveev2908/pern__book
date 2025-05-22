import { X } from "lucide-react";
import type { FC } from "react";

type PropsType = {
  handleClick: () => void;
  isDisabled?: boolean;
};

const CloseBtn: FC<PropsType> = ({ handleClick, isDisabled }) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={handleClick}
      className="absolute top-1 right-2 appearance-none outline-0 flex justify-center items-center btn__logic_xl enabled:cursor-pointer"
    >
      <X className="min-w-[40px] min-h-[40px] sm:min-w-[45px] sm:min-h-[45px] text-red-600" />
    </button>
  );
};

export default CloseBtn;
