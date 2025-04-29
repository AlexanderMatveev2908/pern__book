import { X } from "lucide-react";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { closePopup, getPopup } from "../../features/common/Popup/popupSlice";
import { BtnAct, PopupStateType } from "@/types/types";
import "./Popup.css";
import SpinnerBtn from "@/components/elements/spinners/SpinnerBtn/SpinnerBtn";

const Popup: FC = () => {
  const [ids] = useState(Array.from({ length: 2 }, () => v4()));
  const popRef = useRef<HTMLDivElement>(null);

  const popupState: PopupStateType = useSelector(getPopup);

  const dispatch = useDispatch();
  const clearPop = () => {
    dispatch(closePopup());
  };

  const arrBtn = useMemo(
    () => [popupState.leftBtn, popupState.rightBtn],
    [popupState.leftBtn, popupState.rightBtn]
  );

  useEffect(() => {
    const animateIn = () => {
      if (!popRef.current || !popupState.isPopup) return;

      popRef.current.classList.remove("popup_in");

      requestAnimationFrame(() => {
        popRef.current?.classList.add("popup_in");
      });
    };

    animateIn();
  }, [popupState.isPopup]);

  useEffect(() => {
    const animateOut = () => {
      if (
        !popRef.current ||
        typeof popupState.isPopup === "object" ||
        popupState.isPopup
      )
        return;

      popRef.current.classList.remove("popup_out");

      requestAnimationFrame(() => {
        popRef.current?.classList.add("popup_out");
      });
    };

    animateOut();
  }, [popupState.isPopup]);

  return (
    <>
      <div
        className={`z__popup_bg bg-black/50 inset-0 ${
          popupState.isPopup ? "fixed" : "hidden"
        }`}
      ></div>
      <div
        ref={popRef}
        className={`z__popup fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border-[3px] border-blue-600 rounded-xl p-6 bg-[#000] min-w-[80%] min-h-1/2 sm:max-w-[600px] sm:min-w-[600px] grid grid-cols-1 justify-items-center txt__col gap-10 sm:gap-20 transition-all duration-[0.4s] pop ${
          popupState.isPopup ? "pointer-events-auto" : "pointer-events-none"
        } ${typeof popupState.isPopup === "object" ? "opacity-0" : ""} `}
      >
        <button
          onClick={clearPop}
          disabled={arrBtn.some((el) => el.isPending)}
          className="absolute top-1 right-2 appearance-none outline-0 flex justify-center items-center btn__logic_xl enabled:cursor-pointer"
        >
          <X className="min-w-[40px] min-h-[40px] sm:min-w-[45px] sm:min-h-[45px] text-red-600" />
        </button>

        <div className="w-full flex pt-5">
          <span className="txt__4">{popupState.txt}</span>
        </div>

        <div
          className="w-full gap-x-5 gap-y-5 justify-items-center h-fit items-start"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          }}
        >
          {ids.map((id, i) =>
            arrBtn[i]?.isPending ? (
              <SpinnerBtn />
            ) : (
              <button
                disabled={
                  (!i && arrBtn[1]?.isPending) || (!!i && arrBtn[0]?.isPending)
                }
                onClick={() => arrBtn[i]?.cb?.()}
                key={id}
                className={`min-w-[200px] sm:min-w-[250px] appearance-none border-2 rounded-xl enabled:cursor-pointer py-2 px-3 h-fit enabled:hover:text-gray-300 btn__logic_md ${
                  arrBtn[i]?.act === BtnAct.DO
                    ? "border-green-600  enabled:hover:bg-green-600"
                    : arrBtn[i]?.act === BtnAct.DEL
                    ? "border-red-600 enabled:hover:bg-red-600"
                    : "border-blue-600 enabled:hover:bg-blue-600"
                }`}
              >
                <span className="txt__3">{arrBtn[i]?.label}</span>
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};
export default Popup;
