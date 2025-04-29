import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { BtnAct } from "@/types/types";
import { FC, useMemo } from "react";
import { FaTrashAlt, FaVideo } from "react-icons/fa";
import { MdVideoCall } from "react-icons/md";
import { FiVideo } from "react-icons/fi";
import { useFormContext } from "react-hook-form";
import ErrorFormField from "../Errors/ErrorFormField";

const VideoField: FC = () => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();

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
      label: isUpload
        ? "1 File Uploaded"
        : isURL
        ? "1 video uploaded"
        : "Upload File",
      icon: isUpload ? FaVideo : isURL ? FiVideo : MdVideoCall,
    }),
    [isUpload, isURL]
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
    <div className="w-full grid justify-items-start">
      <div
        className={`w-full max-w-[400px] max-h-[225px] flex justify-center items-center relative`}
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

        <div
          className={`w-full h-full transition-all duration-300 delay-100 ${
            isVal ? "scale-100" : "scale-0"
          }`}
        >
          <video
            src={
              isUpload ? URL.createObjectURL(videoData?.[0] as File) : undefined
            }
            controls
            muted
            className={`w-full object-cover h-full ${
              isVal ? "max-w-full max-h-full" : "max-w-0 max-h-0"
            }`}
          />
        </div>
      </div>

      <div
        className={`w-full grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10 max-w-[600px] items-start h-fit ${
          isVal ? "justify-items-center mt-5" : "justify-items-start mt-0"
        }`}
      >
        <label className="flex w-full max-w-[300px]">
          <input
            type="file"
            accept="video/*"
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
