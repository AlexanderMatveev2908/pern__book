import BtnCheckBox from "@/components/forms/inputs/BtnCheckBox/BtnCheckBox";
import { SorterSearch } from "@/types/types";
import { useCallback, type FC } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  el: SorterSearch;
  handleClick: (val: string, el: SorterSearch) => void;
};

const PairSort: FC<PropsType> = ({ el, handleClick }) => {
  const { watch } = useFormContext();

  const getIsIn = useCallback(
    (val: string) => watch(el.field) === val,
    [el.field, watch]
  );

  return (
    <div className="w-[80%] justify-self-center grid grid-cols-1 h-fit items-start el__border_sm px-4 pt-3 pb-5 gap-5">
      <div className="w-full flex justify-center items-center gap-5">
        <el.icon className="icon__md" />
        <span className="txt__3">{el.label}</span>
      </div>

      <div className="w-full grid grid-cols-2">
        {el.fields.map((field) => (
          <div
            key={field.id}
            className="w-full max-w-[75px] justify-self-center"
          >
            <BtnCheckBox
              {...{
                Icon: field.icon,
                isIn: getIsIn(field.val),
                handleClick: () => {
                  handleClick(field.val, el);
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PairSort;
