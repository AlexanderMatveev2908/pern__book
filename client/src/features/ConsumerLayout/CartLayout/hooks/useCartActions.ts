import { useWrapMutationAPI } from "@/core/hooks/hooks";
import { cartSLiceAPI } from "../cartSliceAPI";
import { CartBtnType } from "@/types/types";
import { BookType } from "@/types/all/books";

type Params = {
  label: CartBtnType;
  book?: BookType;
};

export const useCartActionsClick = ({ label, book }: Params) => {
  const [mutate, { isLoading }] =
    cartSLiceAPI.endpoints.updateQtyCartClick.useMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const handleClick = async () => {
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
