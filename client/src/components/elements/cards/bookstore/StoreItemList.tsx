import { isArrOk } from "@/core/lib/lib";
import { BookStoreType } from "@/types/all/bookStore";
import { useMemo, type FC } from "react";
import ImagesItem from "../../imagesHandlers/ImagesItem/ImagesItem";
import SpanInfoCard from "../shared/SpanInfoCard";
import { HiLibrary } from "react-icons/hi";
import { FaCity } from "react-icons/fa";
import PairBtnsLink from "../shared/PairBtnsLink";
import { BtnIconLinkType } from "@/types/types";

type PropsType = {
  el: BookStoreType;
  links: BtnIconLinkType[];
};

const StoreItemList: FC<PropsType> = ({ el, links }) => {
  const hasImages = useMemo(() => isArrOk(el.images), [el]);

  return (
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

        <PairBtnsLink {...{ links }} />
      </div>
    </div>
  );
};

export default StoreItemList;
