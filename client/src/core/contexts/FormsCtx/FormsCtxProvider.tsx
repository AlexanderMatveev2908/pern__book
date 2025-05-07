import { FC, ReactNode } from "react";
import { FormsCtx } from "./FormsCtx";
import { useFormsCtxProvider } from "./hooks/useFormsCtxProvider";

type PropsType = {
  children: ReactNode;
};

const FormsCtxProvider: FC<PropsType> = ({ children }) => {
  return (
    <FormsCtx.Provider value={{ ...useFormsCtxProvider() }}>
      {children}
    </FormsCtx.Provider>
  );
};

export default FormsCtxProvider;
