import { tailwindBreak } from "@/config/breakpoints";
import { __cg } from "@/lib/lib";
import { FormBaseProps, FormSettersProps } from "@/types/types";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import ButtonsSwapper from "../ButtonsSwapper/ButtonsSwapper";

type PropsType = {
  fieldsArg: string[];
  dataUser: string[];
} & FormBaseProps &
  Omit<FormSettersProps, "watch">;

const CheckBoxSwapper: FC<PropsType> = ({
  register,
  errors,
  setValue,
  fieldsArg,
  dataUser,
}) => {
  const [fieldsForSwap, setFieldsForSwap] = useState(
    window.innerWidth > tailwindBreak.lg
      ? 9
      : window.innerWidth > tailwindBreak.sm
      ? 6
      : 3
  );
  const [ids] = useState(Array.from({ length: fieldsArg.length }, () => v4()));
  const [idsParent] = useState(
    Array.from({ length: Math.ceil(fieldsArg.length / fieldsForSwap) }, () =>
      v4()
    )
  );
  const [currSwap, setCurrSwap] = useState(0);

  const isIn = (val: string) =>
    Array.isArray(dataUser) && dataUser.includes(val);

  const arrParent = useMemo(
    () =>
      Array.from(
        { length: Math.ceil(fieldsArg.length / fieldsForSwap) },
        (_, i) =>
          fieldsArg
            .slice(i * fieldsForSwap, (i + 1) * fieldsForSwap)
            .filter((val) => !!val)
      ),
    [fieldsArg, fieldsForSwap]
  );

  useEffect(() => {
    const resize = () => {
      setFieldsForSwap(
        window.innerWidth > tailwindBreak.lg
          ? 9
          : window.innerWidth > tailwindBreak.sm
          ? 6
          : 3
      );
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const totSwap = useMemo(
    () => Math.ceil(fieldsArg.length / fieldsForSwap),
    [fieldsForSwap, fieldsArg]
  );
  const colsGrid = useMemo(() => Math.ceil(fieldsForSwap / 3), [fieldsForSwap]);

  __cg("parent arr", arrParent);
  __cg("fields for swap", fieldsForSwap);
  __cg("tot swap", totSwap);
  __cg("cols grid", colsGrid);
  __cg("currSwap", currSwap);

  return (
    <div className="w-full border-[3px] border-blue-600 justify-self-center rounded-xl overflow-hidden max-w-[1000px] ">
      <div className="w-full max-w-full grid gap-5 grid-cols-1 overflow-hidden p-5">
        <div
          className="flex transition-all duration-500"
          style={{
            width: `${totSwap * 100}%`,
            transform: `translateX(-${(currSwap / totSwap) * 100}%)`,
          }}
        >
          {arrParent.map((arr, i) => (
            <div
              key={idsParent[i]}
              className={`w-full gap-5 h-fit items-start justify-items-center transition-all duration-300  ${
                currSwap !== i ? "opacity-0" : "opacity-100"
              }`}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${colsGrid}, 1fr)`,
              }}
            >
              {arr.map((val, j) => (
                <div
                  key={ids[j]}
                  className={`min-w-[250px] max-w-[275px] border-2 rounded-xl px-5 py-2 flex justify-center items-center ${
                    isIn(val) ? "border-blue-600" : "border-gray-400"
                  }`}
                >
                  <span className="txt__2">{val}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <ButtonsSwapper
          {...{
            currForm: currSwap,
            setCurrForm: setCurrSwap,
            totLen: Math.ceil(fieldsArg.length / fieldsForSwap),
            isNextDisabled: false,
          }}
        />
      </div>
    </div>
  );
};

export default CheckBoxSwapper;

/*
  const arrParent = useMemo(() => {
    const data: string[][] = [];

    let i = 0;
    do {
      const subArray: string[] = [];

      let j = i;
      do {
        subArray.push(fieldsArg[j]);
        j++;
      } while (j < i + 6);

      j = 0;
      data.push(subArray.filter((val) => !!val));
      i += 6;
    } while (i < fieldsArg.length);

    return data;
  }, [fieldsArg]);
  */
