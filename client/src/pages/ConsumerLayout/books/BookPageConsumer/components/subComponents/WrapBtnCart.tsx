import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { KEY_ACTION_CART } from "@/core/config/fieldsData/labels/shared";
import { useWrapMutationAPI } from "@/core/hooks/hooks";
import { cartSLiceAPI } from "@/features/ConsumerLayout/CartLayout/cartSliceAPI";
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
  bookID?: string;
};

const WrapBtnCart: FC<PropsType> = ({ label, disabled, bookID }) => {
  const [mutate, { isLoading }] =
    cartSLiceAPI.endpoints.updateQtyCartClick.useMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const handleClick = async () => {
    const res = await wrapMutationAPI({
      cbAPI: () => mutate({ act: label.keyAction, bookID: bookID ?? "" }),
    });

    if (!res) return;
  };

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
