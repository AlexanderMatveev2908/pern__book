import { BookType } from "@/types/all/books";
import { type FC } from "react";
import { labelBookTitle } from "@/core/config/fieldsData/labels/shared";
import SpanTitleCard from "@/components/elements/cards/shared/spans/SpanTitleCard";
import { useGetCart } from "@/core/hooks/all/api/useGetCart";
import PairBtnsLink from "@/components/elements/cards/shared/PairBtnsLink";
import MainContentBookConsumer from "./subcomponents/MainContentBookConsumer";
import ButtonsCart from "@/features/ConsumerLayout/CartLayout/components/ButtonsCart";
import ItemList from "@/components/elements/cards/shared/ItemList";

type PropsType = {
  el: BookType;
};

const BookItemConsumer: FC<PropsType> = ({ el }) => {
  const { cart } = useGetCart({});

  return (
    <div className="card border-neutral-800">
      <div className="body_card">
        <SpanTitleCard {...{ label: labelBookTitle(el.title) }} />

        <ItemList {...{ images: el?.images }}>
          <MainContentBookConsumer {...{ el }} />
        </ItemList>
      </div>

      <div className="footer_card">
        <PairBtnsLink {...{ ids: [`/consumer/books/${el.id}`] }} />

        <ButtonsCart {...{ book: el, cart }} />
      </div>
    </div>
  );
};

export default BookItemConsumer;
