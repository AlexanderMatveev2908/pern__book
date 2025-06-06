import { KEY_ACTION_CART } from "@/core/config/fieldsData/labels/shared";
import { BookType } from "@/types/all/books";
import { BtnAct } from "@/types/types";
import { type FC } from "react";
import { IconType } from "react-icons/lib";
import { useCartActionsClick } from "../hooks/useCartActions";
import Button from "@/components/elements/buttons/Button/Button";

type PropsType = {
  label: {
    icon: IconType;
    keyAction: KEY_ACTION_CART;
    act: BtnAct;
  } & { label: string };
  disabledByParent?: boolean;
  book?: BookType;
  setLocalQty?: React.Dispatch<React.SetStateAction<number>>;
  localQty?: number;
  existingItemCartQty?: number;
};

const MainBtnAddCart: FC<PropsType> = ({ label, disabledByParent, book }) => {
  const { handleClick, isLoading: isLoadingClick } = useCartActionsClick({
    label,
    book,
    main: true,
  });

  return (
    <div className="w-full flex max-w-[250px]">
      <Button
        {...{
          act: BtnAct.DO,
          Icon: label.icon,
          label: label.label,
          handleClick,
          isDisabled: disabledByParent,
          isLoading: isLoadingClick,
        }}
      />
    </div>
  );
};

export default MainBtnAddCart;
