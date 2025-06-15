/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useMemo, type ReactNode } from "react";
import PagesCounter from "../elements/PageCounter/PagesCounter";
import { UseFormReturn } from "react-hook-form";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { TriggerRTK } from "@/types/types";
import WrapApp from "./WrapApp";

type PropsType = {
  children?: () => ReactNode | ReactNode[];
  formCtx: UseFormReturn<any>;
  hook?: TriggerRTK;
  paramID?: string;
  isSuccess?: boolean;
};

const WrapperContentAPI: FC<PropsType> = ({
  children,
  paramID,
  hook,
  formCtx,
  isSuccess = true,
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
      <WrapApp
        {...{
          ...res,
          isSuccess,
          isLoading: spinPage,
        }}
      >
        {() => children?.()}
      </WrapApp>

      {!spinPage && (
        <PagesCounter
          {...{ totPages, triggerRtk, paramID, getValues: formCtx.getValues }}
        />
      )}
    </>
  );
};

export default WrapperContentAPI;
