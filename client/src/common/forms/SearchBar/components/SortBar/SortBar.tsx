import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { FC } from "react";

type PropsType = {};

const SortBar: FC<PropsType> = ({}) => {
  const {
    bars: { sortBar },
  } = useSearchCtx();

  return (
    <div
      className={`fixed inset-0 ${
        sortBar ? "z__popup" : "pointer-events-none"
      }`}
    ></div>
  );
};

export default SortBar;
