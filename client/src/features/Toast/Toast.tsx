import { FC } from "react";
import { IoClose } from "react-icons/io5";
import "./Toast.css";

const Toast: FC = () => {
  return (
    <div
      className={`z__toast fixed top-5 right-5 border-[3px] border-green-600 bg-[#000] rounded-xl w-fit min-w-[300px] sm:min-w-[450px] max-w-[80vw] sm:max-w-[500px] md:max-w-[600px] el__toast_container overflow-hidden`}
    >
      <div className="w-full grid justify-items-start relative pb-2">
        {/* TYPE EVENT */}
        <div className="w-full flex justify-start text-green-600 pt-[4px] px-8">
          <span className="txt__4">SUCCESS</span>
        </div>

        {/* SIDE LINE */}
        <div className="absolute top-0 bottom-0 left-0 min-w-[10px] min-h-[120%] bg-green-600"></div>

        {/* CLOSE BTN */}
        <button className="appearance-none top-[4px] right-[4px] absolute btn__toast">
          <IoClose className="icon__md text-red-600" />
        </button>

        {/* TEXT */}
        <div className="w-full flex justify-start text-[whitesmoke] py-1 px-8">
          <span className="txt__3">USER REGISTERED</span>
        </div>

        {/* TIMER */}
        <div className="w-full absolute left-0 bottom-0 bg-green-600 h-[5px]"></div>
      </div>
    </div>
  );
};
export default Toast;
