import { createContext } from "react";
import { SearchCtxValsConsumer } from "./hooks/useSearchCtxVals";

export const SearchCtx = createContext<SearchCtxValsConsumer | null>(null);
