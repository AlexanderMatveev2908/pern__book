import { linksBookConsumer } from "@/features/ConsumerLayout/BooksLayout/fields/card";
import { BookType } from "@/types/all/books";
import { type FC } from "react";
import { labelBookTitle } from "@/core/config/fieldsData/labels/shared";
import SpanTitleCard from "@/components/elements/cards/shared/SpanTitleCard";
import { useGetCart } from "@/core/hooks/all/api/useGetCart";
import PairBtnsLink from "@/components/elements/cards/shared/PairBtnsLink";
import MainContentBookConsumer from "./subcomponents/MainContentBookConsumer";
import ButtonsCart from "@/features/ConsumerLayout/CartLayout/components/ButtonsCart";
import ItemList from "@/components/elements/cards/shared/ItemList";

type PropsType = {
  el: BookType;
};

const BookItemConsumer: FC<PropsType> = ({ el }) => {
  const { cart } = useGetCart();

  return (
    <div className="card">
      <div className="body_card">
        <SpanTitleCard {...{ label: labelBookTitle(el.title) }} />

        <ItemList {...{ el }}>
          <MainContentBookConsumer {...{ el }} />
        </ItemList>
      </div>

      <div className="footer_card">
        <PairBtnsLink {...{ ID: el.id, links: linksBookConsumer(el.id) }} />

        <ButtonsCart {...{ book: el, cart }} />
      </div>
    </div>
  );
};

export default BookItemConsumer;
