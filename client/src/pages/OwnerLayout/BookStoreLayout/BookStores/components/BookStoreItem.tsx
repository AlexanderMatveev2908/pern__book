import ItemID from "@/components/elements/cards/shared/ItemID";
import { linksCardStore } from "@/features/OwnerLayout/bookStores/fields/card";
import { BookStoreType } from "@/types/all/bookStore";
import { FC, useMemo } from "react";
import ImagesItem from "@/components/elements/imagesHandlers/ImagesItem/ImagesItem";
import SpanInfoCard from "@/components/elements/cards/shared/SpanInfoCard";
import { HiLibrary } from "react-icons/hi";
import { FaCity } from "react-icons/fa";
import PairBtnsLink from "@/components/elements/cards/shared/PairBtnsLink";
import { isArrOk } from "@/core/lib/lib";

type PropsType = {
  el: BookStoreType;
};

const BookStoreItemOwner: FC<PropsType> = ({ el }) => {
  const hasImages = useMemo(() => isArrOk(el.images), [el]);

  return (
    <div className="item">
      <ItemID {...{ ID: el.id }} />

      <div className="content">
        {hasImages && (
          <div className="images_wrapper">
            <ImagesItem {...{ images: el.images }} />
          </div>
        )}

        <div className={`info_wrapper ${!hasImages ? "col-span-2" : ""}`}>
          <SpanInfoCard
            {...{
              spanInfo: {
                label: el.name,
                icon: HiLibrary,
              },
            }}
          />
          <SpanInfoCard
            {...{
              spanInfo: {
                label: el.city,
                icon: FaCity,
              },
            }}
          />

          <PairBtnsLink {...{ links: linksCardStore(el.id) }} />
        </div>
      </div>
    </div>
  );
};

export default BookStoreItemOwner;
