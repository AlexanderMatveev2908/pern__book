import { OrderStoreType } from "@/types/all/orders";
import type { FC } from "react";
import { fieldsOrderStore } from "./fields";
import SpanPageInfo from "../../shared/spans/SpanPageInfo";

type PropsType = {
  os: OrderStoreType;
};

const OrderStorePage: FC<PropsType> = ({ os }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      <div className="w-full grid grid-cols-1 p-5 border-blue-600 rounded-xl border-[3px] gap-y-4 gap-x-8 lg:grid-cols-2">
        {fieldsOrderStore(os).map((el) => (
          <SpanPageInfo
            key={el.id}
            {...{
              el,
              txt: "txt__3",
              styleParent: "grid-cols-[repeat(auto-fit,minmax(150px,1fr))]",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderStorePage;
