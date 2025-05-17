/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, type FC, type ReactNode } from "react";
import WrapPageAPI from "./WrapPageAPI";
import PagesCounter from "../elements/PageCounter/PagesCounter";
import { UseFormReturn } from "react-hook-form";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";

type PropsType = {
  children: ReactNode;
  formCtx: UseFormReturn<any>;
  hook: any;
};

const WrapperContentAPI: FC<PropsType> = ({ children, hook, formCtx }) => {
  const [trigger, res] = hook;
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
          isLoading: spinPage,
          isError: res?.isError,
          error: res?.error,
        }}
      >
        {children}
      </WrapPageAPI>

      {!spinPage && (
        <PagesCounter
          {...{ totPages, trigger, getValues: formCtx.getValues }}
        />
      )}
    </>
  );
};

export default WrapperContentAPI;
