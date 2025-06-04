import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { KEY_ACTION_CART } from "@/core/config/fieldsData/labels/shared";
import { useCartActionsClick } from "@/features/ConsumerLayout/CartLayout/hooks/useCartActions";
import { useCartActionsPress } from "@/features/ConsumerLayout/CartLayout/hooks/useCartActionsPress";
import { BookType } from "@/types/all/books";
import { BtnAct } from "@/types/types";
import { useState, type FC } from "react";
import { IconType } from "react-icons/lib";

type PropsType = {
  label: {
    icon: IconType;
    keyAction: KEY_ACTION_CART;
    act: BtnAct;
  };
  // disabled?: boolean;
  book?: BookType;
  setLocalQty?: React.Dispatch<React.SetStateAction<number>>;
  localQty?: number;
  existingItemCartQty?: number;
};

const WrapBtnCart: FC<PropsType> = ({
  label,
  // disabled,
  book,
  setLocalQty,
  localQty,
  existingItemCartQty,
}) => {
  const { handleClick, isLoading: isLoadingClick } = useCartActionsClick({
    label,
    book,
  });
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    handleMousePress,
    handleMouseLeave,
    handleMouseUp,
    isLoading: isLoadingPress,
  } = useCartActionsPress({
    setLocalQty,
    setIsDisabled,
    label,
    book,
    localQty,
    existingItemCartQty,
  });

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      className="w-full max-w-[75px] flex justify-center"
    >
      <ButtonIcon
        {...{
          act: label.act,
          el: label,
          handleClick,
          isDisabled,
          isPending: isLoadingClick || isLoadingPress,
          handleMousePress,
        }}
      />
    </div>
  );
};

export default WrapBtnCart;
