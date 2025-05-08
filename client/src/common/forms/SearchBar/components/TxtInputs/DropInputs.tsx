import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { makeDelay, saveStorage } from "@/core/lib/lib";
import { FormFieldBasic, StorageKeys } from "@/types/types";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaSearchPlus } from "react-icons/fa";

type PropsType = {
  txtInputs: FormFieldBasic[];
  keyStorageLabels: StorageKeys;
};

const addFieldBtn = {
  icon: FaSearchPlus,
};

const DropInputs: FC<PropsType> = ({ txtInputs, keyStorageLabels }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const { setFocus } = useFormContext();

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

  const { activeTxtInputs, setTxtInputs, setCanMakeAPI } = useSearchCtx();

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
        className={`absolute z-60 bg-neutral-950 border-2 border-blue-600 w-[200%] -left-full p-2 rounded-xl top-12 transition-all duration-[0.4s] ${
          isDropOpen
            ? "opacity-100 translate-y-0"
            : "translate-y-[75px] opacity-0 pointer-events-none"
        }`}
      >
        {arg.map((el) => (
          <li
            onClick={async () => {
              setCanMakeAPI(false);
              const updated = [...activeTxtInputs, el];
              setTxtInputs(updated);
              saveStorage({ key: keyStorageLabels, data: updated });
              await makeDelay(async () => await setFocus(el.field), 0);
              setIsDropOpen(false);
            }}
            key={el.id}
            className="w-full hover:text-blue-600 el__flow cursor-pointer"
          >
            <span className="txt__3">{el.field}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropInputs;
