import { tailwindBreak } from "@/config/breakpoints";
import { FormBaseProps, FormSettersProps } from "@/types/types";
import { FC, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import ButtonsSwapper from "../ButtonsSwapper/ButtonsSwapper";
import ErrorFormField from "../inputs/ErrorFormField";
import BtnCheckBox from "../inputs/BtnCheckBox/BtnCheckBox";

type PropsType = {
  fieldsArg: string[];
  keyForm: string;
  maxData?: number;
} & Omit<FormBaseProps, "register"> &
  FormSettersProps;

const calcByW = () =>
  window.innerWidth > tailwindBreak.xl
    ? 12
    : window.innerWidth > tailwindBreak.lg
    ? 9
    : window.innerWidth > tailwindBreak.sm
    ? 6
    : 3;

const calcTotSwap = (len: number, fieldsForSwap: number) =>
  Math.ceil(len / fieldsForSwap);

const CheckBoxSwapper: FC<PropsType> = ({
  errors,
  setValue,
  maxData,
  watch,
  keyForm,
  fieldsArg,
}) => {
  const [fieldsForSwap, setFieldsForSwap] = useState(calcByW());
  const [idsChildren] = useState(
    Array.from({ length: fieldsArg.length }, () => v4())
  );
  const [idsParent] = useState(
    Array.from({ length: Math.ceil(fieldsArg.length / fieldsForSwap) }, () =>
      v4()
    )
  );
  const [currSwap, setCurrSwap] = useState(0);

  const dataUser = watch(keyForm);

  const totSwap = useMemo(
    () => calcTotSwap(fieldsArg.length, fieldsForSwap),
    [fieldsForSwap, fieldsArg]
  );
  const colsGrid = useMemo(() => Math.ceil(fieldsForSwap / 3), [fieldsForSwap]);
  const isIn = (val: string) =>
    Array.isArray(dataUser) && dataUser.includes(val);

  const arrParent = useMemo(
    () =>
      Array.from({ length: totSwap }, (_, i) =>
        fieldsArg
          .slice(i * fieldsForSwap, (i + 1) * fieldsForSwap)
          .filter((val) => !!val)
      ),
    [fieldsArg, fieldsForSwap, totSwap]
  );

  useEffect(() => {
    const resize = () => {
      setFieldsForSwap(calcByW());
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleCatClick = (val: string) =>
    setValue(
      keyForm,
      (dataUser as string[])?.includes(val)
        ? dataUser?.filter((el: string) => el !== val)
        : Array.isArray(dataUser)
        ? dataUser?.length >= (maxData ?? 3)
          ? [...dataUser.slice(1, dataUser.length), val]
          : [...dataUser, val]
        : [val],
      { shouldValidate: true }
    );

  return (
    <div className="w-full border-[3px] border-blue-600 justify-self-center rounded-xl relative">
      <ErrorFormField
        {...{
          errors,
          el: { field: keyForm },
          styleCont: "-top-[20%] right-0",
        }}
      />

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
              className={`w-full gap-5 h-fit items-start justify-items-center transition-all duration-300 ${
                currSwap !== i
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100 pointer-events-auto"
              }`}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${colsGrid}, 1fr)`,
              }}
            >
              {arr.map((val, j) => (
                <BtnCheckBox
                  key={idsChildren[j]}
                  {...{
                    isIn: isIn(val),
                    val,
                    handleClick: () => handleCatClick(val),
                  }}
                />
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
