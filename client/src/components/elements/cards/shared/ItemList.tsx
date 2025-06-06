/* eslint-disable @typescript-eslint/no-explicit-any */
import { isArrOk } from "@/core/lib/lib";
import { useMemo, type FC } from "react";
import ImagesItem from "../../imagesHandlers/ImagesItem/ImagesItem";

type PropsType = {
  children: React.ReactNode;
  el: any;
};

const ItemList: FC<PropsType> = ({ children, el }) => {
  const hasImages = useMemo(() => isArrOk(el.images), [el]);

  return (
    <div className="content">
      {hasImages && (
        <div className="images_wrapper">
          <ImagesItem {...{ images: el.images }} />
        </div>
      )}

      <div className={`info_wrapper ${!hasImages ? "col-span-2" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default ItemList;
