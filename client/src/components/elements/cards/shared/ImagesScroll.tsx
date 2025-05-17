import { AssetCloudType } from "@/types/types";
import type { FC } from "react";

type PropsType = {
  images: AssetCloudType[] | null;
};

const ImagesScroll: FC<PropsType> = ({ images }) => {
  return !images?.length ? null : (
    <div className="w-full flex border-[3px] border-blue-600 rounded-xl p-3"></div>
  );
};

export default ImagesScroll;
