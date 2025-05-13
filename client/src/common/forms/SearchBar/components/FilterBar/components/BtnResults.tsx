/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/elements/buttons/Button/Button";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { setLimitCards } from "@/core/lib/lib";
import { useCallback, type FC } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  res: any;
};

const BtnResults: FC<PropsType> = ({ res }) => {
  const { data: { nHits } = {} } = res ?? {};
  const { isPending, setIsPending, setArgs, args } = useSearchCtx();
  const { getValues } = useFormContext();

  const handleClick = useCallback(() => {
    setIsPending({ el: "submit", val: true });

    setArgs({
      ...getValues(),
      page: args?.page ?? 0,
      limit: args?.limit ?? setLimitCards(),
      _: Date.now(),
    });
  }, [args?.limit, args?.page, setArgs, getValues, setIsPending]);

  return (
    <div className="p-3 border-t-[3px] h-[75px]  border-blue-600 absolute bottom-0 left-0 w-full z-60 bg-neutral-950 flex justify-center items-center">
      <div className="w-full max-w-[200px]">
        <Button
          {...{
            label: `${nHits ?? 0} Result${!nHits || nHits > 1 ? "s" : ""}`,
            isPending: isPending.submit,
            handleClick,
          }}
        />
      </div>
    </div>
  );
};

export default BtnResults;
