import { useWrapMutationAPI } from "@/core/hooks/hooks";
import { cartSLiceAPI } from "../cartSliceAPI";
import { CartBtnType } from "@/types/types";
import { BookType } from "@/types/all/books";
import { KEY_ACTION_CART } from "@/core/config/fieldsData/labels/shared";
import { tailwindBreak } from "@/core/config/breakpoints";

type Params = {
  label: CartBtnType;
  book?: BookType;
};

export const useCartActionsClick = ({ label, book }: Params) => {
  const [mutate, { isLoading }] =
    cartSLiceAPI.endpoints.updateQtyCartClick.useMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const handleClick = async () => {
    if (label.keyAction !== KEY_ACTION_CART.REMOVE_FROM_CART) {
      if (window.innerWidth > tailwindBreak.md) return;
    }

    const res = await wrapMutationAPI({
      cbAPI: () => mutate({ act: label.keyAction, bookID: book?.id ?? "" }),
    });

    if (!res) return;
  };

  return {
    handleClick,
    isLoading,
  };
};
