import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { __cg, makeDelay } from "@/core/lib/lib";
import { FormFieldBasic } from "@/types/types";
import { FC, useEffect, useRef, useState } from "react";
import { UseFormSetFocus } from "react-hook-form";
import { FaSearchPlus } from "react-icons/fa";

type PropsType = {
  txtInputs: FormFieldBasic[];
  setFocus: UseFormSetFocus<any>;
};

const addFieldBtn = {
  icon: FaSearchPlus,
};

const DropInputs: FC<PropsType> = ({ txtInputs, setFocus }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listenClick = (e: MouseEvent) => {
      if (!dropRef.current) return null;

      if (!dropRef.current.contains(e.target as Node)) setIsDropOpen(false);
    };

    document.addEventListener("mousedown", listenClick);
    return () => {
      document.removeEventListener("mousedown", listenClick);
    };
  }, []);

  const { activeTxtInputs, setTxtInputs } = useSearchCtx();

  return activeTxtInputs.length === txtInputs.length ? null : (
    <div
      ref={dropRef}
      className="w-full max-w-[75px] justify-self-end relative"
    >
      <ButtonIcon
        {...{
          el: addFieldBtn,
          handleClick: () => setIsDropOpen(!isDropOpen),
        }}
      />

      <ul
        className={`absolute z-60 bg-neutral-950 border-2 border-blue-600 w-[200%] -left-full p-2 rounded-xl top-12 transition-all duration-[0.4s] ${
          isDropOpen
            ? "opacity-100 translate-y-0"
            : "translate-y-[75px] opacity-0 pointer-events-none"
        }`}
      >
        {txtInputs.map((el) =>
          activeTxtInputs.includes(el) ? null : (
            <li
              onClick={async () => {
                setTxtInputs([...activeTxtInputs, el]);
                makeDelay(async () => await setFocus(el.field), 0);
                setIsDropOpen(false);
              }}
              key={el.id}
              className="w-full hover:text-blue-600 el__flow cursor-pointer"
            >
              <span className="txt__3">{el.field}</span>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default DropInputs;
