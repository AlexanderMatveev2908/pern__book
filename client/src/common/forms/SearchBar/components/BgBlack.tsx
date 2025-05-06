import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { FC, useMemo } from "react";

const BgBlack: FC = () => {
  const { bars } = useSearchCtx();

  const isBg = useMemo(() => Object.values(bars).some((el) => !!el), [bars]);

  return isBg ? (
    <div className="fixed inset-0 bg-black/60 z__popup_bg"></div>
  ) : null;
};

export default BgBlack;
