import { FC, useEffect, useRef, useState } from "react";
import style from "./Terms.module.css";

type PropsType = {};

const Terms: FC = () => {
  const [check, setCheck] = useState<boolean | null>(null);
  const checkRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className="w-full flex items-center justify-start gap-5">
      <div
        onClick={() => setCheck(!check)}
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
    </div>
  );
};
export default Terms;
