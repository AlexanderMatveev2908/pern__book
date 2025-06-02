import { FC, ReactNode, useReducer } from "react";
import { SearchCtx } from "./SearchCtx";
import { initStateSearch } from "./reducer/initState";
import { reducerSearch } from "./reducer/reducer";
import { useSearchCtxVals } from "./hooks/useSearchCtxVals";

type PropsType = {
  children: ReactNode;
};

const SearchCtxProvider: FC<PropsType> = ({ children }) => {
  const [state, dispatch] = useReducer(reducerSearch, initStateSearch);

  return (
    <SearchCtx.Provider value={{ ...useSearchCtxVals({ state, dispatch }) }}>
      {children}
    </SearchCtx.Provider>
  );
};

export default SearchCtxProvider;
