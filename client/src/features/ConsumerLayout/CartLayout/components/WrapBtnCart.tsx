import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { KEY_ACTION_CART } from "@/core/config/fieldsData/labels/shared";
import { useCartActionsClick } from "@/features/ConsumerLayout/CartLayout/hooks/useCartActions";
import { useCartActionsPress } from "@/features/ConsumerLayout/CartLayout/hooks/useCartActionsPress";
import { BookType } from "@/types/all/books";
import { CartBtnType } from "@/types/types";
import { useState, type FC } from "react";

type PropsType = {
  label: CartBtnType;
  disabledByParent?: boolean;
  book?: BookType;
  setLocalQty?: React.Dispatch<React.SetStateAction<number>>;
  localQty?: number;
  existingItemCartQty?: number;
};

const WrapBtnCart: FC<PropsType> = ({
  label,
  book,
  setLocalQty,
  localQty,
  existingItemCartQty,
  disabledByParent,
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
          isDisabled:
            disabledByParent ||
            (label.keyAction !== KEY_ACTION_CART.REMOVE_FROM_CART
              ? isDisabled
              : false),
          isPending: isLoadingClick || isLoadingPress,
          handleMousePress,
        }}
      />
    </div>
  );
};

export default WrapBtnCart;
