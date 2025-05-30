import { FC, ReactNode } from "react";
import { SwapCtx, useSwapCtxValsProducer } from "./ctx/ctx";

type PropsType = {
  children: ReactNode | ReactNode[];
};

const SwapCtxProvider: FC<PropsType> = ({ children }) => {
  return (
    <SwapCtx.Provider value={{ ...useSwapCtxValsProducer() }}>
      {children}
    </SwapCtx.Provider>
  );
};

export default SwapCtxProvider;
