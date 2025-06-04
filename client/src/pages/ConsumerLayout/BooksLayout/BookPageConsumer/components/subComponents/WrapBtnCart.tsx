import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { KEY_ACTION_CART } from "@/core/config/fieldsData/labels/shared";
import { useCartActionsClick } from "@/features/ConsumerLayout/CartLayout/hooks/useCartActions";
import { BookType } from "@/types/all/books";
import { BtnAct } from "@/types/types";
import { type FC } from "react";
import { IconType } from "react-icons/lib";

type PropsType = {
  label: {
    icon: IconType;
    keyAction: KEY_ACTION_CART;
    act: BtnAct;
  };
  disabled?: boolean;
  book?: BookType;
};

const WrapBtnCart: FC<PropsType> = ({ label, disabled, book }) => {
  const { handleClick, isLoading } = useCartActionsClick({
    label,
    book,
  });

  return (
    <div className="w-full max-w-[75px] flex justify-center">
      <ButtonIcon
        {...{
          act: label.act,
          el: label,
          handleClick,
          isDisabled: disabled,
          isPending: isLoading,
        }}
      />
    </div>
  );
};

export default WrapBtnCart;
