import { BtnAct } from "@/types/types";
import { FC, useMemo, useRef } from "react";
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { MdCloudUpload } from "react-icons/md";
import { RiFolderUploadFill } from "react-icons/ri";
import { FaImages, FaTrashAlt } from "react-icons/fa";
import ShowImagesData from "./ShowImagesData";
import { useFormContext } from "react-hook-form";
import ErrorFormField from "../../Errors/ErrorFormField";
import FocusAnchor from "../../FocusAnchor";

const updateByTransfer = (updated: File[]) => {
  const dataTransfer = new DataTransfer();
  for (const item of updated) {
    if (item instanceof File) dataTransfer.items.add(item);
  }

  return dataTransfer;
};

const ImagesField: FC = () => {
  const {
    setValue,
    formState: { errors },
    watch,
    register,
  } = useFormContext();

  const inputRef = useRef<HTMLInputElement | null>(null);

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

  // const handleUploadBtnClick = () => {
  //   const myEvent = new MouseEvent("click");

  //   inputRef.current?.dispatchEvent(myEvent);
  // };
  const handleUploadBtnClick = () => inputRef?.current?.click();
  const handleClearClick = () => {
    if (!inputRef.current) return;

    inputRef.current.value = "";

    setValue("images", [], { shouldValidate: true });
  };
  const handleRemoveOne = (i: number) => {
    if (!inputRef.current) return;

    const updated = images.filter(
      (_: File | string, index: number) => index !== i
    );

    if (updated.every((el: File | string) => el instanceof File)) {
      const dataTransfer = updateByTransfer(updated);
      inputRef.current.files = dataTransfer.files;
    }
    //  else {
    //   inputRef.current.value = "";
    // }

    setValue("images", updated, { shouldValidate: true });
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

  return (
    <div className="w-full grid justify-items-start items-start">
      <div className="w-full max-w-[600px] relative">
        <ErrorFormField
          {...{
            errors,
            styleCont: { top: "-50px", right: "0px" },
            el: { field: "images" },
          }}
        />

        <FocusAnchor {...{ register, fieldKey: "images" }} />
      </div>

      <ShowImagesData {...{ isVal, images, isUploadFiles, handleRemoveOne }} />

      <div
        className={`w-full max-w-[650px] grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10 ${
          isVal ? "justify-items-center mt-5" : "justify-items-start mt-0"
        }`}
      >
        <label
          className={`w-full max-w-[350px] flex ${
            isVal ? "justify-center" : "justify-start"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            className="w-0 h-0 opacity-0"
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (!inputRef.current) return;

              const files = e.target.files ?? [];

              const data = Array.from(files);
              // const dataTransfer = updateByTransfer(data);
              // inputRef.current.files = dataTransfer.files;

              setValue("images", data, { shouldValidate: true });
            }}
          />

          <div className="w-full max-w-[350px]">
            <ButtonIcon
              {...{ el: elBtnLabel, handleClick: handleUploadBtnClick }}
            />
          </div>
        </label>

        {isVal && (
          <div className="flex w-full max-w-[300px]">
            <ButtonIcon
              {...{
                el: elBtnRemove,
                handleClick: handleClearClick,
                act: BtnAct.DEL,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagesField;
