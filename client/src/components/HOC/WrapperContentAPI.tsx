/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, type FC, type ReactNode } from "react";
import WrapPageAPI from "./WrapPageAPI";
import PagesCounter from "../elements/PageCounter/PagesCounter";
import { UseFormReturn } from "react-hook-form";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";

type PropsType = {
  children: ReactNode;
  res: any;
  formCtx: UseFormReturn<any>;
  ctx: SearchCtxValsConsumer;
};

const WrapperContentAPI: FC<PropsType> = ({ children, res, ctx, formCtx }) => {
  const {
    preSubmit: { isPopulated, isFormStable },
  } = ctx;
  const { data } = res ?? {};
  const { totPages = 0 } = data ?? {};

  const spinPage = useMemo(
    () => res?.isLoading || res?.isFetching || !isPopulated || !isFormStable,
    [res?.isLoading, res?.isFetching, isPopulated, isFormStable]
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
        <PagesCounter {...{ totPages, getValues: formCtx.getValues }} />
      )}
    </>
  );
};

export default WrapperContentAPI;
