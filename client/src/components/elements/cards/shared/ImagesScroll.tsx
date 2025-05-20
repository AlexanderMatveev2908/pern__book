import { AssetCloudType } from "@/types/types";
import { useRef, type FC } from "react";
import ImgLoaderHandler from "./ImgLoaderHandler/ImgLoaderHandler";

type PropsType = {
  images?: AssetCloudType[] | null;
};

const ImagesScroll: FC<PropsType> = ({ images }) => {
  const snapperRef = useRef<HTMLDivElement | null>(null);

  return !images?.length ? null : (
    <div
      ref={snapperRef}
      className="w-full flex border-[3px] border-blue-600 rounded-xl p-4 overflow-x-auto scrollbar__x scrollbar__app gap-5 snap-x snap-mandatory"
    >
      {images.map((el) => (
        <div
          key={el.publicID}
          className="w-full min-w-[200px] max-w-[200px] min-h-[200px] max-h-[200px] rounded-xl overflow-hidden border-2 border-neutral-700 snap-center sm:min-w-[300px] sm:max-w-[300px] sm:min-h-[300px] sm:max-h-[300px]"
        >
          <ImgLoaderHandler {...{ url: el.url }} />
        </div>
      ))}
    </div>
  );
};

export default ImagesScroll;
