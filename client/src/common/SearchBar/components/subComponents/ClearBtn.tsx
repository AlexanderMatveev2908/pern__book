/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/elements/buttons/Button/Button";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useClickSearch } from "@/features/common/SearchBar/hooks/useClickSearch";
import { BtnAct, FormFieldBasic } from "@/types/types";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { MdClear } from "react-icons/md";

type PropsType = {
  styleTxt?: string;

  res: any;
  triggerRtk: any;

  txtInputs?: FormFieldBasic[];

  routeID?: string;
  defVals?: any;
  innerJoinCat?: boolean;
};

const CLearBtn: FC<PropsType> = ({
  res,
  triggerRtk,

  styleTxt,

  txtInputs,

  routeID,
  defVals,
  innerJoinCat,
}) => {
  const ctx = useSearchCtx();
  const { isPending } = ctx;

  const formCtx = useFormContext();

  const { handleClear } = useClickSearch({
    ctx,
    formCtx,
    txtInputs,
    triggerRtk,
    routeID,
    defVals,
    innerJoinCat,
  });

  return (
    <Button
      {...{
        label: "Clear",
        styleTxt,
        type: "button",
        act: BtnAct.DEL,
        Icon: MdClear,
        handleClick: handleClear,
        isPending: isPending?.clear,
        isDisabled: res?.isFetching,
      }}
    />
  );
};

export default CLearBtn;
