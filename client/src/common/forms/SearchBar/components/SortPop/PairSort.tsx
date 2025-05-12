import BtnCheckBox from "@/components/forms/inputs/BtnCheckBox/BtnCheckBox";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";
import { SorterSearch } from "@/types/types";
import { useCallback, type FC } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  el: SorterSearch;
  ctx: SearchCtxValsConsumer;
};

const PairSort: FC<PropsType> = ({ el }) => {
  const { setValue, getValues, watch } = useFormContext();

  const getIsIn = useCallback(
    (val: string) => watch(el.field) === val,
    [el.field, watch]
  );
  const handleClick = useCallback(
    (val: string) => {
      const currVal = getValues(el.field);

      setValue(
        el.field,
        !currVal?.trim()?.length || currVal !== val ? val : "",
        { shouldValidate: true }
      );
    },
    [el.field, getValues, setValue]
  );

  return (
    <div className="w-[80%] justify-self-center grid grid-cols-1 h-fit items-start border-2 border-blue-600 rounded-xl px-4 pt-3 pb-5 gap-5">
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
                handleClick: () => handleClick(field.val),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PairSort;
