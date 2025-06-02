/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useGetSearchKeysStorage } from "@/features/common/SearchBar/hooks/useGetSearchKeysStorage";
import { cpyObj, getDefValsPagination, saveStorage } from "@/core/lib/lib";
import { FormFieldBasic } from "@/types/types";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FaSearchPlus } from "react-icons/fa";
import { v4 } from "uuid";

type PropsType = {
  txtInputs?: FormFieldBasic[];
};

const addFieldBtn = {
  icon: FaSearchPlus,
};

const DropInputs: FC<PropsType> = ({ txtInputs }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const { watch, getValues, control } = useFormContext();
  const { append } = useFieldArray({
    control,
    name: "items",
  });
  const fields = watch("items");

  const { keyStorage } = useGetSearchKeysStorage();
  const {
    pagination: { page, limit },
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
    // ? fb = with fallback
    const itemsFb = fields ?? [];

    const active = new Set(itemsFb.map((el: FormFieldBasic) => el?.field));
    const filtered = (txtInputs ?? []).filter((el) => !active.has(el.field));
    return filtered;
  }, [fields, txtInputs]);

  const showNothing = useMemo(() => {
    if (
      txtInputs?.length === fields?.length &&
      [txtInputs?.length, fields.length].every((el) => !!el)
    )
      return true;
  }, [txtInputs, fields]);

  return showNothing ? null : (
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
        className={`absolute z-60 bg-neutral-950 el__border_sm w-[250%] -left-[150%] top-14 transition-all duration-[0.4s] max-h-[150px] pr-1 overflow-y-auto scroll_app scroll_y ${
          isDropOpen
            ? "opacity-100 translate-y-0"
            : "translate-y-[75px] opacity-0 pointer-events-none"
        }`}
      >
        {/* ? IF U DO NOT ADD VALS TO STORAGE RIGHT NOW ON MOUNT U WILL HAVE A DOUBLE FETCH ONE ON POPULATE , ON ON DEBOUNCE WHEN CURRENT VALS WILL CHANGE CAUSE THE LABEL ADDED SAVED IN LABELS WILL AUTOMATICALLY PART OF THE DOM AND SO REGISTERED TO USE_FORM_HOOK AND THIS WILL PROVOKE A CHANGE IN THE COMPARISON BETWEEN OLD AND NEW VALS TRIGGERING A REFETCH JUST FOR AN EMPTY STRING BUT THAT INCREASE THE LENGTH OF KEYS ON NEW OBJ IN THE RECURSIVE FUNCTION THAT CHECK EQUALITY BETWEEN REFERENCE AND VALS OF USE_FORM MERGED WITH PAGINATION VALS OF REUSABLE CONTEXT THAT WRAP THE PAGE IN PAGE.TSX */}
        {arg.map((el) => (
          <li
            key={el.id}
            onClick={async () => {
              setPreSubmit({ el: "canMakeAPI", val: false });

              const newField = {
                ...el,
                val: "",
                id: v4(),
              };
              append(newField, { shouldFocus: true });

              const updatedVals = cpyObj({
                ...getValues(),
                items: [...(fields ?? []), newField],
                ...getDefValsPagination(page, limit),
              });

              if (updatedVals === oldVals.current)
                throw new Error("memory reference drop_txt_component 😡");

              oldVals.current = updatedVals;
              saveStorage({ key: keyStorage as any, data: updatedVals });

              setIsDropOpen(false);
            }}
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
