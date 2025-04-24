import ButtonIcon from "@/components/common/buttons/ButtonIcon/ButtonIcon";
import { BtnAct } from "@/types/types";
import { Trash2 } from "lucide-react";
import { FC } from "react";

const el = {
  icon: Trash2,
  label: "Delete account",
};

const DeleteAccount: FC = () => {
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
          {...{ act: BtnAct.DEL, el, handleCLick: () => console.log("run") }}
        />
      </div>
    </div>
  );
};
export default DeleteAccount;
