/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonIcon from "@/components/common/buttons/ButtonIcon/ButtonIcon";
import { BtnAct, FormBaseProps } from "@/types/types";
import { FC, useMemo } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import { MdDriveFolderUpload } from "react-icons/md";
import ErrorFormField from "./ErrorFormField";

type PropsType = {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
} & FormBaseProps;

const VideoField: FC<PropsType> = ({ register, errors, setValue, watch }) => {
  const videoData = watch("video") as FileList | string;
  const isUpload = videoData?.[0] instanceof File;
  const isURL = typeof videoData === "string" && videoData?.trim()?.length;
  const isVal = isURL || isUpload;

  const handleUploadBtnClick = (e: React.MouseEvent) =>
    (e.currentTarget?.previousElementSibling as HTMLInputElement)?.click();
  const handleRemoveBtnClick = () =>
    setValue("video", "", { shouldValidate: true });

  const elBtn = useMemo(
    () => ({
      label: isUpload ? "1 File Uploaded" : "Upload",
      icon: MdDriveFolderUpload,
    }),
    [isUpload]
  );
  const elBtnRemove = useMemo(
    () => ({
      icon: FaTrashAlt,
      label: `${
        isUpload ? "Remove File" : isURL ? "Delete Video" : "Remove Video"
      }`,
    }),
    [isUpload, isURL]
  );

  return (
    <div className="w-full grid justify-items-start gap-5">
      <div
        className={`w-full max-w-[600px] lg:max-w-1/2 max-h-[250px] flex justify-center items-center relative transition-all duration-300`}
      >
        <ErrorFormField
          {...{
            el: { field: "video" },
            errors,
            styleCont: ` ${
              isVal ? "right-0 -top-[50px]" : "left-[50px] -top-[75px]"
            } `,
          }}
        />

        <div className={`w-full h-full ${isVal ? "scale-100" : "scale-0"}`}>
          <video
            src={isUpload ? URL.createObjectURL(videoData?.[0] as File) : ""}
            controls
            muted
            className={`w-full object-cover h-full ${
              isVal ? "max-w-full max-h-full" : "max-w-0 max-h-0"
            }`}
          />
        </div>
      </div>

      <div className="w-full flex items-center gap-10">
        <label className="flex w-full max-w-[300px]">
          <input
            type="file"
            accept="video"
            className="opacity-0 h-0 w-0"
            {...register("video")}
          />

          <ButtonIcon
            {...{
              handleClick: handleUploadBtnClick,
              el: elBtn,
            }}
          />
        </label>

        {isVal && (
          <div className="w-full max-w-[300px]">
            <ButtonIcon
              {...{
                handleClick: handleRemoveBtnClick,
                el: elBtnRemove,
                act: BtnAct.DEL,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoField;
