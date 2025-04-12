/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef } from "react";
import style from "./Terms.module.css";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useSavePrevErr } from "../../../../hooks/useSavePrevErr";

type PropsType = {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors;
};

const Terms: FC<PropsType> = ({ setValue, watch, errors }) => {
  const checkRef = useRef<HTMLDivElement | null>(null);

  const { prevErr } = useSavePrevErr(errors, "terms");

  useEffect(() => {
    const animateChecky = (e: MouseEvent) => {
      if (
        checkRef.current &&
        checkRef.current &&
        checkRef.current.contains(e.target as Node)
      ) {
        checkRef.current.classList.remove(style.checky);
        requestAnimationFrame(() => {
          checkRef.current?.classList.add(style.checky);
        });
      }
    };

    document.addEventListener("click", animateChecky);

    return () => document.removeEventListener("click", animateChecky);
  }, []);

  const check = watch("terms");

  return (
    <div className="w-fit flex items-center justify-start gap-5 relative">
      <div
        onClick={() =>
          setValue("terms", !watch("terms"), { shouldValidate: true })
        }
        ref={checkRef}
        className={`min-w-[30px] min-h-[30px] rounded-xl relative el__flow cursor-pointer ${style.check__terms}`}
        style={
          {
            "--check-color":
              typeof check === "object"
                ? "#2563eb"
                : check
                ? "#16a34a"
                : "#dc2626",
          } as React.CSSProperties
        }
      >
        <div
          className={`absolute border-l-[4px] border-b-[4px] h-5 w-10 border-green-600 -top-[12px] left-0 -rotate-45 transition-all duration-150 delay-75 ${
            check ? "scale-100" : "scale-0"
          }`}
        ></div>
      </div>

      <span className="txt__2">I agree terms and conditions</span>

      <div
        className={`absolute -bottom-[150%] left-0 transition-all duration-300 text-red-600 border-2 border-red-600 rounded-xl py-1 px-5 bg-[#000] z-60 ${
          errors?.terms?.message
            ? "translate-y-0 opacity-100"
            : "translate-y-[200%] opacity-0"
        }`}
      >
        {(errors?.terms?.message as string) || prevErr}
      </div>
    </div>
  );
};
export default Terms;
