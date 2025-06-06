import { linksBookConsumer } from "@/features/ConsumerLayout/BooksLayout/fields/card";
import { BookType } from "@/types/all/books";
import { useMemo, type FC } from "react";
import { labelBookTitle } from "@/core/config/fieldsData/labels/shared";
import SpanTitleCard from "@/components/elements/cards/shared/SpanTitleCard";
import { isArrOk } from "@/core/lib/lib";
import { useGetCart } from "@/core/hooks/all/api/useGetCart";
import ImagesItem from "@/components/elements/imagesHandlers/ImagesItem/ImagesItem";
import PairBtnsLink from "@/components/elements/cards/shared/PairBtnsLink";
import MainContentBookConsumer from "./subcomponents/MainContentBookConsumer";
import ButtonsCart from "@/features/ConsumerLayout/CartLayout/components/ButtonsCart";

type PropsType = {
  el: BookType;
};

const BookItemConsumer: FC<PropsType> = ({ el }) => {
  const { cart } = useGetCart();

  const hasImages = useMemo(() => isArrOk(el.images), [el]);

  return (
    <div className="wrapper_item_consumer">
      <div className="item_consumer">
        <div className="w-full">
          <SpanTitleCard {...{ label: labelBookTitle(el.title) }} />
        </div>

        <div className="content">
          {hasImages && (
            <div className="images_wrapper">
              <ImagesItem {...{ images: el.images }} />
            </div>
          )}

          <div className={`info_wrapper ${!hasImages ? "col-span-2" : ""}`}>
            <MainContentBookConsumer {...{ el }} />
          </div>
        </div>
      </div>

      <div
        className="w-full grid gap-x-10 gap-y-5 items-center"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        <PairBtnsLink {...{ ID: el.id, links: linksBookConsumer(el.id) }} />

        <ButtonsCart {...{ book: el, cart }} />
      </div>
    </div>
  );
};

export default BookItemConsumer;
