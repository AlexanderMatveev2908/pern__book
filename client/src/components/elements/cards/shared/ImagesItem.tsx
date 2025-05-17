import { AssetCloudType } from "@/types/types";
import { FC } from "react";

type PropsType = {
  images?: AssetCloudType[] | null;
};

const ImagesItem: FC<PropsType> = ({ images }) => {
  return !Array.isArray(images) || !images.length ? null : (
    <div className="w-full flex overflow-hidden rounded-xl">
      <div className="flex el__border_sm overflow-x-auto snap-mandatory snap-x p-5 gap-x-5 scrollbar__app scrollbar__x">
        {images.map((el) => (
          <div
            key={el.publicID}
            className="w-full min-w-[150px] max-w-[150px] max-h-[150px] rounded-xl overflow-hidden border-2 border-neutral-800 snap-center sm:min-w-[200px] sm:max-w-[200px] sm:max-h-[200px] sm:min-h-[200px]"
          >
            <img src={el.url} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesItem;
