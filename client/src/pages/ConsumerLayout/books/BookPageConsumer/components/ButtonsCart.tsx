import { BookType } from "@/types/all/books";
import type { FC } from "react";
import WrapBtnCart from "./components/WrapBtnCart";
import {
  labelAddCart,
  labelDecQtyCart,
  labelRemoveFromCart,
} from "@/core/config/fieldsData/labels/shared";

type PropsType = {
  book: BookType;
};

const ButtonsCart: FC<PropsType> = () => {
  return (
    <div
      className="w-full justify-items-center items-center gap-x-5 gap-y-5 md:max-w-[600px] justify-self-center"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
      }}
    >
      <div className="w-full grid grid-cols-2 items-center justify-items-center">
        <WrapBtnCart {...{ label: labelAddCart }} />

        <div className="w-full max-w-[50px] flex justify-center">
          <span className="txt__5">0</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 justify-items-center items-center">
        <WrapBtnCart {...{ label: labelDecQtyCart }} />
        <WrapBtnCart {...{ label: labelRemoveFromCart }} />
      </div>
    </div>
  );
};

export default ButtonsCart;
