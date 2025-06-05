import { AssetCloudType } from "@/types/types";
import { FC } from "react";
import ImgLoaderHandler from "./ImgLoaderHandler";

type PropsType = {
  images?: AssetCloudType[] | null;
};

const ImagesItem: FC<PropsType> = ({ images }) => {
  return !Array.isArray(images) || !images.length ? null : (
    <div className="w-full flex justify-center overflow-hidden rounded-xl images_item">
      <div className="flex overflow-x-auto snap-mandatory snap-x gap-x-5 scroll_app scroll_x">
        {images.map((el) => (
          <div
            key={el.publicID}
            className="w-full rounded-xl overflow-hidden border-2 border-neutral-800 snap-center wrapper"
          >
            <ImgLoaderHandler {...{ url: el.url }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesItem;
