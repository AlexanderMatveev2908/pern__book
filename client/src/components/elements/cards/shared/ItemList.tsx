import { isArrOk } from "@/core/lib/lib";
import { useMemo, type FC } from "react";
import ImagesItem from "../../imagesHandlers/ImagesItem/ImagesItem";
import { AssetCloudType } from "@/types/types";

type PropsType = {
  children: React.ReactNode;
  images?: AssetCloudType[] | null;
};

const ItemList: FC<PropsType> = ({ children, images }) => {
  const hasImages = useMemo(() => isArrOk(images), [images]);

  return (
    <div className="content">
      {hasImages && (
        <div className="images_wrapper">
          <ImagesItem {...{ images }} />
        </div>
      )}

      <div className={`info_wrapper ${!hasImages ? "col-span-2" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default ItemList;
