import { AssetCloudType } from "@/types/types";
import { useRef, type FC } from "react";
import ImgLoaderHandler from "../ImgLoaderHandler/ImgLoaderHandler";

type PropsType = {
  images?: AssetCloudType[] | null;
  customStyleParent?: string;
};

const ImagesScroll: FC<PropsType> = ({ images, customStyleParent }) => {
  const snapperRef = useRef<HTMLDivElement | null>(null);

  return !images?.length ? null : (
    <div
      ref={snapperRef}
      className="w-full justify-self-center max-w-fit h-fit flex rounded-xl pb-4 overflow-x-auto scroll_x scroll_app gap-5 snap-x snap-mandatory"
    >
      {images.map((el) => (
        <div
          key={el.publicID}
          className={`w-full rounded-xl overflow-hidden border-2 border-neutral-700 snap-center ${
            customStyleParent ??
            "min-w-[200px] max-w-[200px] min-h-[200px] max-h-[200px] sm:max-w-[300px] sm:min-h-[300px] sm:max-h-[300px] sm:min-w-[300px]"
          }`}
        >
          <ImgLoaderHandler {...{ url: el.url }} />
        </div>
      ))}
    </div>
  );
};

export default ImagesScroll;
