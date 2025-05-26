import { FC, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { closePopup, getPopup } from "../../features/common/Popup/popupSlice";
import { BtnAct, PopupStateType } from "@/types/types";
import SpinnerBtn from "@/components/elements/spinners/SpinnerBtn/SpinnerBtn";
import CloseBtn from "@/components/elements/buttons/CloseBtn";
import { useAnimatePop } from "@/core/hooks/all/UI/useAnimatePop";

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

  useAnimatePop({
    isPopup: popupState.isPopup,
    popRef,
  });

  return (
    <>
      <div
        className={`z__popup_bg popup bg-black/50 inset-0 ${
          popupState.isPopup ? "fixed" : "hidden"
        }`}
      ></div>
      <div
        ref={popRef}
        className={`z__popup fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border-[3px] border-blue-600 rounded-xl p-6 bg-[#000] min-w-[80%] min-h-1/2 sm:max-w-[600px] sm:min-w-[600px] grid grid-cols-1 justify-items-center txt__col gap-10 sm:gap-20 transition-all duration-[0.4s] pop ${
          popupState.isPopup ? "pointer-events-auto" : "pointer-events-none"
        } ${typeof popupState.isPopup === "object" ? "opacity-0" : ""} `}
      >
        <CloseBtn
          {...{
            handleClick: clearPop,
            isDisabled: arrBtn.some((el) => el.isPending),
          }}
        />

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
                onClick={async () => await arrBtn[i]?.cb?.()}
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
