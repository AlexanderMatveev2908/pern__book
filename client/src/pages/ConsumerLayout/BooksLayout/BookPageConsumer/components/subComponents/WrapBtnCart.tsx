import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { KEY_ACTION_CART } from "@/core/config/fieldsData/labels/shared";
import { useCartActionsPress } from "@/features/ConsumerLayout/CartLayout/hooks/useCartActionsPress";
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
  setLocalQty?: React.Dispatch<React.SetStateAction<number>>;
  localQty?: number;
};

const WrapBtnCart: FC<PropsType> = ({
  label,
  disabled,
  book,
  setLocalQty,
  localQty,
}) => {
  // const { handleClick, isLoading } = useCartActionsClick({
  //   label,
  //   book,
  // });

  const { handleMousePress, handleMouseLeave, isLoading } = useCartActionsPress(
    {
      setLocalQty,
      label,
      book,
      localQty,
    }
  );

  return (
    <div
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-[75px] flex justify-center"
    >
      <ButtonIcon
        {...{
          act: label.act,
          el: label,
          // handleClick,
          isDisabled: disabled,
          isPending: isLoading,
          handleMousePress,
        }}
      />
    </div>
  );
};

export default WrapBtnCart;
