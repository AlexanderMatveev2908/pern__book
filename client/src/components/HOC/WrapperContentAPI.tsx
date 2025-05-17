/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, type FC, type ReactNode } from "react";
import WrapPageAPI from "./WrapPageAPI";
import PagesCounter from "../elements/PageCounter/PagesCounter";
import { UseFormReturn } from "react-hook-form";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";

type PropsType = {
  children: ReactNode;
  formCtx: UseFormReturn<any>;
  ctx: SearchCtxValsConsumer;
  hook: any;
};

const WrapperContentAPI: FC<PropsType> = ({ children, hook, ctx, formCtx }) => {
  const [trigger, res] = hook;
  const {
    preSubmit: { isPopulated },
  } = ctx;
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
          {...{ totPages, trigger, ctx, getValues: formCtx.getValues }}
        />
      )}
    </>
  );
};

export default WrapperContentAPI;
