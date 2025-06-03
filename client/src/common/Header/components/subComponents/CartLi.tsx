import type { FC } from "react";
import { TbShoppingCartShare } from "react-icons/tb";
import { Link } from "react-router-dom";

type PropsType = {
  cartCount?: number;
  setIsOpen: (isOpen: boolean) => void;
};

const CartLi: FC<PropsType> = ({ cartCount, setIsOpen }) => {
  return (
    <Link
      to="/consumer/cart"
      onClick={() => setIsOpen(false)}
      className="w-full flex items-center gap-5 el__after_below el__flow hover:text-blue-600"
    >
      <TbShoppingCartShare className="icon__sm" />
      <span className="txt__2">Cart</span>

      <div className="border-2 border-blue-600 p-2 w-[35px] h-[35px] rounded-full flex items-center justify-center">
        <span className="text-lg sm:text-xl font-bold">{cartCount}</span>
      </div>
    </Link>
  );
};

export default CartLi;
