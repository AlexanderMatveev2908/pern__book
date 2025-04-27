import { FC, useEffect, useState } from "react";
import RemoveImgLayer from "./RemoveImgLayer";
import { v4 } from "uuid";

type PropsType = {
  isVal: boolean;
  images: File[] | string[];
  isUploadFiles: boolean;
  handleRemoveOne: (index: number) => void;
};

const ShowImagesData: FC<PropsType> = ({
  isVal,
  images,
  isUploadFiles,
  handleRemoveOne,
}) => {
  const [ids, setIds] = useState<string[] | null>(
    Array.isArray(images) && images?.length ? images.map(() => v4()) : null
  );

  useEffect(() => {
    if (Array.isArray(images) && images?.length) setIds(images.map(() => v4()));
  }, [images]);

  return (
    <div
      className={`w-full flex border-[3px] rounded-xl overflow-scroll scrollbar__hidden gap-6 ${
        isVal ? "border-blue-600 p-3" : "border-transparent p-0"
      }`}
    >
      {isVal &&
        images.map((_: File | string, i: number) => (
          <div
            key={ids?.[i]}
            className="min-w-[150px] max-w-[150px] min-h-[150px] max-h-[150px] sm:min-w-[200px] sm:max-w-[200px] sm:min-h-[200px] sm:max-h-[200px] relative rounded-xl overflow-hidden"
          >
            <img
              src={
                isUploadFiles
                  ? URL.createObjectURL(images?.[i] as File)
                  : (images?.[i] as string)
              }
              alt="_"
              className="w-full h-full object-cover"
            />
            <RemoveImgLayer {...{ handleClick: () => handleRemoveOne(i) }} />
          </div>
        ))}
    </div>
  );
};

export default ShowImagesData;
