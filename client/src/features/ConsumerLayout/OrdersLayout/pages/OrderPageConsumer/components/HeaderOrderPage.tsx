import SpanPageInfo from "@/components/elements/cards/shared/spans/SpanPageInfo";
import { OrderType } from "@/types/all/orders";
import { useMemo, type FC } from "react";
import { fieldsHeaderOrder } from "../../../fields/orderPageConsumer";
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BtnAct } from "@/types/types";
import { useNavigate } from "react-router-dom";
import ErrCard from "@/components/elements/cards/shared/ErrCard";
import { isObjOk } from "@/core/lib/lib";

type PropsType = {
  o: OrderType;
};

const HeaderOrderPage: FC<PropsType> = ({ o }) => {
  const filteredFields = useMemo(
    () => fieldsHeaderOrder(o).filter((el) => el.val),
    [o]
  );

  const nav = useNavigate();

  const isAvailable = useMemo(
    () => o!.orderStores!.every((os) => isObjOk(os?.store)),
    [o]
  );
  const canGoCheckout = useMemo(() => typeof o.orderedAt !== "string", [o]);

  return (
    <div
      className={`${
        isAvailable ? "border-blue-600" : "border-red-600"
      } w-full grid grid-cols-1 xl:grid-cols-2 gap-y-5 gap-x-10 p-5 border-[3px] rounded-xl`}
    >
      {filteredFields.map((el) => (
        <SpanPageInfo
          key={el.id}
          {...{
            el: {
              icon: el.icon,
              label: el.label,
              val: el.val as string,
            },
            styleSubParents: [null, "xl:justify-self-end"],
            txt: "txt__3",
            styleParent: "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
          }}
        />
      ))}

      {isAvailable ? (
        canGoCheckout && (
          <div className="w-full flex justify-self-center max-w-[300px] lg:col-span-2">
            <ButtonIcon
              {...{
                el: { label: "Checkout", icon: MdOutlineShoppingCartCheckout },
                act: BtnAct.DO,
                handleClick: () => nav(`/consumer/checkout/${o.id}`),
              }}
            />
          </div>
        )
      ) : (
        <ErrCard {...{ msg: "This order is no longer available" }} />
      )}
    </div>
  );
};

export default HeaderOrderPage;
