import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { KEY_ACTION_CART } from "@/core/config/fieldsData/labels/shared";
import { BtnAct } from "@/types/types";
import type { FC } from "react";
import { IconType } from "react-icons/lib";

type PropsType = {
  label: {
    icon: IconType;
    keyAction: KEY_ACTION_CART;
    act: BtnAct;
  };
  disabled?: boolean;
};

const WrapBtnCart: FC<PropsType> = ({ label, disabled }) => {
  return (
    <div className="w-full max-w-[75px] flex justify-center">
      <ButtonIcon
        {...{
          act: label.act,
          el: label,
          handleClick: () => console.log(label.keyAction),
          isDisabled: disabled,
        }}
      />
    </div>
  );
};

export default WrapBtnCart;
