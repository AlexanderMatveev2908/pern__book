import { FC, useEffect, useRef } from "react";
import { FieldErrors } from "react-hook-form";
import { FormSettersProps } from "@/types/types";
import ErrorFormField from "@/components/forms/Errors/ErrorFormField";
import s from "./Terms.module.css";

type PropsType = {
  errors: FieldErrors;
} & FormSettersProps;

const Terms: FC<PropsType> = ({ setValue, watch, errors }) => {
  const checkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animateChecky = (e: MouseEvent) => {
      if (
        checkRef.current &&
        checkRef.current &&
        checkRef.current.contains(e.target as Node)
      ) {
        checkRef.current.classList.remove(s.checky);
        requestAnimationFrame(() => {
          checkRef.current?.classList.add(s.checky);
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
        role="checkbox"
        aria-checked={check}
        aria-label="accept  and conditions"
        onClick={() =>
          setValue("terms", !watch("terms"), { shouldValidate: true })
        }
        ref={checkRef}
        className={`${s.terms} min-w-[30px] min-h-[30px] rounded-xl relative el__flow cursor-pointer`}
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

      <ErrorFormField
        {...{
          errors,
          styleCont: { top: "-135%", right: "-10%" },
          el: { field: "terms" },
        }}
      />
    </div>
  );
};
export default Terms;
