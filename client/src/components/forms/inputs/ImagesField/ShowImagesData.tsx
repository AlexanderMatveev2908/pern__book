import { FC, useMemo } from "react";
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
  const ids = useMemo(
    () => Array.isArray(images) && images.map(() => v4()),
    [images]
  );

  return (
    <div
      className={`w-fit max-w-full flex border-[3px] rounded-xl overflow-scroll scrollbar__hidden gap-6 ${
        isVal
          ? "border-blue-600 p-3 scale-100 transition-all duration-300 delay-75"
          : "border-transparent p-0 scale-0"
      }`}
    >
      {isVal &&
        images.map((_: File | string, i: number) => (
          <div
            key={(Array.isArray(ids) && ids?.[i]) || i}
            className="min-w-[150px] max-w-[150px] min-h-[150px] max-h-[150px] sm:min-w-[200px] sm:max-w-[200px] sm:min-h-[200px] sm:max-h-[200px] md:max-w-[250px] md:min-w-[250px] md:max-h-[250px] md:min-h-[250px] lg:max-w-[300px] lg:min-w-[300px] lg:max-h-[300px] lg:min-h-[300px] relative rounded-xl overflow-hidden"
          >
            <img
              src={
                isUploadFiles
                  ? URL.createObjectURL(images?.[i] as File)
                  : (images?.[i] as string)
              }
              alt="_"
              className="w-full h-full object-contain"
            />
            <RemoveImgLayer {...{ handleClick: () => handleRemoveOne(i) }} />
          </div>
        ))}
    </div>
  );
};

export default ShowImagesData;
