/* eslint-disable @typescript-eslint/no-explicit-any */
import { capt } from "@/core/lib/lib";
import { MySelectFieldType } from "@/types/types";
import { FC, useEffect, useRef, useState } from "react";
import { FieldErrors } from "react-hook-form";
import { FaCheckCircle, FaChevronDown } from "react-icons/fa";
import ErrorFormField from "../Errors/ErrorFormField";

type PropsType = {
  el: MySelectFieldType;
  errors: FieldErrors;
  index?: number;
  handleClick: (val: any, index: any) => void;
  checkIsIn: (val: any, index: any) => boolean;
  currVal: string | null;
};

const MySelect: FC<PropsType> = ({
  el,
  handleClick,
  errors,
  checkIsIn,
  currVal,
  index,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const listen = (e: MouseEvent) => {
      const arrRefs = [btnRef.current, ulRef.current];
      if (arrRefs.some((el) => !el)) return;

      if (arrRefs.some((ref) => (e.target as Node).contains(ref)))
        setIsOpen(false);
    };

    document.addEventListener("mousedown", listen);
    return () => {
      document.removeEventListener("mousedown", listen);
    };
  }, []);

  return (
    <div className="w-full grid h-full items-end relative ">
      <div className="w-full relative">
        <ErrorFormField
          {...{
            errors,
            index,
            el,
            styleCont: "-top-full right-0",
          }}
        />
        <button
          ref={btnRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between appearance-none outline-0 cursor-pointer border-2 border-blue-600 rounded-xl px-4 py-2 items-center hover:text-blue-600 el__flow"
        >
          <span className="txt__3">
            {typeof currVal === "object" ? el.label : capt(currVal)}
          </span>

          <div className="w-fit">
            <FaChevronDown
              className={`icon__sm transition-all duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        <ul
          ref={ulRef}
          className={`w-full mt-2 h-fit absolute top-full left-0 border-2 grid bg-neutral-950 z-20 border-blue-600 rounded-xl transition-all duration-[0.4s] ${
            isOpen ? "" : "translate-y-[75px] opacity-0 pointer-events-none"
          }`}
        >
          {el.options.map((subEl, i, arg) => {
            const isIn = checkIsIn(subEl.opt, index);
            return (
              <li
                onClick={() => {
                  handleClick(subEl.opt, index);
                  setIsOpen(false);
                }}
                key={subEl.id}
                className={`p-2 cursor-pointer hover:text-blue-600 el__flow flex justify-center gap-6 ${
                  isIn ? "text-blue-600" : ""
                } ${i !== arg.length - 1 ? "border-b-2 border-blue-600" : ""}`}
              >
                {isIn && <FaCheckCircle className="icon__sm -ml-12" />}
                <span className="txt__2">{subEl.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MySelect;
