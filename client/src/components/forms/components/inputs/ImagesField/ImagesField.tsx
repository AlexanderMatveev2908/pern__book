import { BtnAct, FormBaseProps, FormSettersProps } from "@/types/types";
import { FC, useMemo, useState } from "react";
import ErrorFormField from "../ErrorFormField";
import ButtonIcon from "@/components/common/buttons/ButtonIcon/ButtonIcon";
import { MdCloudUpload } from "react-icons/md";
import { RiFolderUploadFill } from "react-icons/ri";
import { FaImages, FaTrashAlt } from "react-icons/fa";
import { v4 } from "uuid";
import RemoveImgLayer from "./RemoveImgLayer";
import { __cg } from "@/lib/lib";

type PropsType = Omit<FormBaseProps, "register"> & FormSettersProps;

const ImagesField: FC<PropsType> = ({ errors, watch, setValue }) => {
  const [ids] = useState(Array.from({ length: 10 }, () => v4()));
  const images = watch("images");
  const isUploadFiles =
    Array.isArray(images) &&
    images.every((el) => el instanceof File) &&
    !!images?.length;
  const isURLs =
    Array.isArray(images) &&
    !!images?.length &&
    images.every((el) => typeof el === "string" && el?.trim()?.length);
  const isVal = isUploadFiles || isURLs;

  const handleUploadBtnClick = (e: React.MouseEvent) =>
    (e.currentTarget?.previousElementSibling as HTMLInputElement)?.click();
  const handleClearClick = () =>
    setValue("images", [], { shouldValidate: true });
  const handleRemoveOne = (i: number) => {
    const img = images[i] as File | string;

    const arrImgs = Array.from(images as FileList);
    setValue(
      "images",
      arrImgs.filter((_, index) => index !== i),
      { shouldValidate: true }
    );
    __cg("single img", img);
  };

  const elBtnLabel = useMemo(
    () => ({
      icon: isUploadFiles
        ? RiFolderUploadFill
        : isURLs
        ? FaImages
        : MdCloudUpload,
      label: isUploadFiles
        ? `${images?.length} Files Uploaded`
        : isURLs
        ? `${images?.length} Images Uploaded`
        : "Upload File",
    }),
    [isURLs, isUploadFiles, images?.length]
  );
  const elBtnRemove = useMemo(
    () => ({
      icon: FaTrashAlt,
      label: `${
        isUploadFiles ? "Remove Files" : isURLs ? "Delete images" : "Remove"
      }`,
    }),
    [isUploadFiles, isURLs]
  );

  __cg("images", images);

  return (
    <div className="w-full grid justify-items-start gap-5 items-start">
      <div className="w-full max-w-[600px] relative">
        <ErrorFormField
          {...{
            errors,
            styleCont: "-top-[50px] left-[100px]",
            el: { field: "images" },
          }}
        />
      </div>

      <div className="w-full flex border-[3px] border-blue-600 p-3 rounded-xl overflow-scroll scrollbar__hidden gap-6">
        {ids.slice(0, images?.length ?? 0).map((id, i) => (
          <div
            key={id}
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

      <div
        className={`w-full max-w-[600px] grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10 ${
          isVal ? "justify-items-center" : "justify-items-start"
        }`}
      >
        <label className="w-full max-w-[350px] flex justify-start">
          <input
            type="file"
            multiple
            className="w-0 h-0 opacity-0"
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const files = e.target.files ?? [];

              setValue("images", Array.from(files), { shouldValidate: true });
            }}
          />

          <ButtonIcon
            {...{ el: elBtnLabel, handleClick: handleUploadBtnClick }}
          />
        </label>

        {isVal && (
          <ButtonIcon
            {...{
              el: elBtnRemove,
              handleClick: handleClearClick,
              act: BtnAct.DEL,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImagesField;
