import SpanPageInfo from "@/components/elements/cards/shared/SpanPageInfo";
import { OrderType } from "@/types/all/orders";
import type { FC } from "react";
import { fieldsHeaderOrder } from "../../../fields/orderPage";

type PropsType = {
  o: OrderType;
};

const HeaderOrderPage: FC<PropsType> = ({ o }) => {
  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-y-5 gap-x-10">
      {...fieldsHeaderOrder(o).map((el) => (
        <SpanPageInfo
          key={el.id}
          {...{
            el: {
              icon: el.icon,
              label: el.label,
              val: el.val,
            },
            styleSubParents: [null, "xl:justify-self-end"],
            txt: "txt__4",
            styleParent: "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
          }}
        />
      ))}
    </div>
  );
};

export default HeaderOrderPage;
