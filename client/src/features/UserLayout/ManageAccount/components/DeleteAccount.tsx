import ButtonIcon from "@/components/common/buttons/ButtonIcon/ButtonIcon";
import {
  closePopup,
  loadPop,
  openPopup,
} from "@/features/common/Popup/popupSlice";
import { BtnAct, BtnPopupKeys } from "@/types/types";
import { Trash2 } from "lucide-react";
import { FC } from "react";
import { useDispatch } from "react-redux";

const el = {
  icon: Trash2,
  label: "Delete account",
};

const DeleteAccount: FC = () => {
  const dispatch = useDispatch();

  const handleMainCLick = () => {
    dispatch(
      openPopup({
        txt: "Some random text Some random text Some random textSome random text...",
        leftBtn: {
          cb: async () => {
            dispatch(loadPop(BtnPopupKeys.LEFT));
            await new Promise<void>((res) => {
              setTimeout(() => {
                dispatch(closePopup());
                res();
              }, 5000);
            });
          },
          label: "Left action",
          act: BtnAct.DO,
        },
        rightBtn: {
          cb: async () => {
            dispatch(loadPop(BtnPopupKeys.RIGHT));
            await new Promise<void>((res) => {
              setTimeout(() => {
                dispatch(closePopup());
                res();
              }, 5000);
            });
          },
          label: "Right action",
          act: BtnAct.DEL,
        },
      })
    );
  };

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-8">
      <div className="">
        <span className="txt__2">This action is</span>
        <span className="txt__3 mx-2 pb_1 border-b-[3px] text-red-600">
          irreversible.
        </span>
        <div className="">
          <span className="txt__2">
            We will delete delete permanently all your data without any
            possibility of recover it
          </span>
        </div>
      </div>

      <div className="w-[250px] mt-10">
        <ButtonIcon
          {...{ act: BtnAct.DEL, el, handleCLick: handleMainCLick }}
        />
      </div>
    </div>
  );
};
export default DeleteAccount;
