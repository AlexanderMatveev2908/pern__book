import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useGetSearchKeysStorage } from "@/core/hooks/all/forms/searchBar/useGetSearchKeysStorage";
import { getDefValsPagination, makeDelay, saveStorage } from "@/core/lib/lib";
import { FormFieldBasic } from "@/types/types";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaSearchPlus } from "react-icons/fa";

type PropsType = {
  txtInputs: FormFieldBasic[];
};

const addFieldBtn = {
  icon: FaSearchPlus,
};

const DropInputs: FC<PropsType> = ({ txtInputs }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const { setFocus, getValues } = useFormContext();

  const { keyStorageLabels } = useGetSearchKeysStorage();
  const {
    activeTxtInputs,
    pagination: { page, limit },
    setTxtInputs,
    oldVals,
    setPreSubmit,
  } = useSearchCtx();

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

  const arg = useMemo(() => {
    const active = new Set(activeTxtInputs.map((el) => el.field));
    const filtered = txtInputs.filter((el) => !active.has(el.field));
    return filtered;
  }, [activeTxtInputs, txtInputs]);

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
        className={`absolute z-60 bg-neutral-950 border-2 border-blue-600 w-[250%] -left-[150%] rounded-xl top-14 transition-all duration-[0.4s] ${
          isDropOpen
            ? "opacity-100 translate-y-0"
            : "translate-y-[75px] opacity-0 pointer-events-none"
        }`}
      >
        {arg.map((el) => (
          <li
            onClick={async () => {
              setPreSubmit({ el: "canMakeAPI", val: false });
              oldVals.current = {
                ...getValues(),
                ...getDefValsPagination(page, limit),
                [el.field]: "",
              };
              const updated = [...activeTxtInputs, el];
              setTxtInputs(updated);
              saveStorage({ key: keyStorageLabels, data: updated });

              setIsDropOpen(false);
              makeDelay(() => setFocus(el.field), 0);
            }}
            key={el.id}
            className="w-full hover:text-blue-600 el__flow cursor-pointer border-b-2 border-blue-600 p-2 last:border-b-0 el__flow"
          >
            <span className="txt__3">{el.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropInputs;
