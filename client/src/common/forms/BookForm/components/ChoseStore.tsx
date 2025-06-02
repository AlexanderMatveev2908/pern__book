import DropHandler from "@/components/elements/dropMenus/DropHandler";
import ErrorFormField from "@/components/forms/Errors/ErrorFormField";
import FocusAnchor from "@/components/forms/FocusAnchor";
import { labelStore } from "@/core/config/fieldsData/labels/shared";
import { isObjOk } from "@/core/lib/lib";
import { BookStoreType } from "@/types/all/bookStore";
import { useEffect, useRef, useState, type FC } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  stores?: Partial<BookStoreType>[];
};

const ChoseStore: FC<PropsType> = ({ stores }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listen = (e: MouseEvent) => {
      if (!dropRef.current) return;
      if (!dropRef.current.contains(e.target as Node)) setIsDropOpen(false);
    };

    document.addEventListener("mousedown", listen);

    return () => {
      document.removeEventListener("mousedown", listen);
    };
  }, []);

  const {
    setValue,
    watch,
    formState: { errors },
    register,
    getValues,
  } = useFormContext();

  const handleClick = (val: string) => {
    if (getValues("bookStoreID") !== val)
      setValue("categories", [], { shouldValidate: true });

    setValue("bookStoreID", val, { shouldValidate: true });
  };

  useEffect(() => {}, []);

  return !stores?.length ||
    !(stores ?? [])?.every((el) => isObjOk(el)) ? null : (
    <div className="w-full flex justify-end">
      <div
        ref={dropRef}
        className="w-full max-w-[300px] el__border_sm py-2 px-4 relative"
      >
        <DropHandler {...{ isDropOpen, setIsDropOpen, el: labelStore }} />

        <FocusAnchor {...{ register, fieldKey: "bookStoreID" }} />
        <ErrorFormField {...{ el: { field: "bookStoreID" }, errors }} />

        <ul
          className={`w-full left-0 absolute z-50 bg-neutral-950 el__border_sm max-h-[200px] scroll_app scroll_y  overflow-y-auto transition-all duration-[0.4s] pr-1 ${
            isDropOpen
              ? "opacity-100"
              : "opacity-0 pointer-events-none translate-y-[50px]"
          }`}
          style={{
            top: "calc(100% + 20px)",
          }}
        >
          {stores.map((el) => (
            <li
              key={el?.id}
              className={`w-full py-3 px-4 cursor-pointer hover:text-blue-600 el__flow border-b-2 border-blue-600 last:border-0 ${
                watch("bookStoreID") === el?.id ? "text-blue-600" : ""
              }`}
              onClick={() => {
                handleClick(el.id!);
                setIsDropOpen(false);
              }}
            >
              <span
                className="clamp_txt txt__2"
                style={{
                  WebkitLineClamp: 2,
                  lineClamp: 2,
                }}
              >
                {el?.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChoseStore;
