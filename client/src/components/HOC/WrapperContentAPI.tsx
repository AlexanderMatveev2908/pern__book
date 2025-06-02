/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, type FC, type ReactNode } from "react";
import WrapPageAPI from "./WrapPageAPI";
import PagesCounter from "../elements/PageCounter/PagesCounter";
import { UseFormReturn } from "react-hook-form";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { TriggerRTK } from "@/types/types";

type PropsType = {
  children: ReactNode;
  formCtx: UseFormReturn<any>;
  hook?: TriggerRTK;
  paramID?: string;
};

const WrapperContentAPI: FC<PropsType> = ({
  children,
  paramID,
  hook,
  formCtx,
}) => {
  const [triggerRtk, res] = hook ?? [() => null, {} as any];
  const {
    preSubmit: { isPopulated },
  } = useSearchCtx();
  const { data } = res ?? {};
  const { totPages = 0 } = data ?? {};

  const spinPage = useMemo(
    () => res?.isLoading || res?.isFetching || !isPopulated,
    [res?.isLoading, res?.isFetching, isPopulated]
  );
  return (
    <>
      <WrapPageAPI
        {...{
          ...res,
          isLoading: spinPage,
        }}
      >
        {children}
      </WrapPageAPI>

      {!spinPage && (
        <PagesCounter
          {...{ totPages, triggerRtk, paramID, getValues: formCtx.getValues }}
        />
      )}
    </>
  );
};

export default WrapperContentAPI;
