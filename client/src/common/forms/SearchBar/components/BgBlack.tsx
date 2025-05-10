import { FC, useMemo } from "react";

type PropsType = {
  bars: {
    filterBar: boolean;
    sortBar: boolean;
  };
};

const BgBlack: FC<PropsType> = ({ bars }) => {
  const isBg = useMemo(() => Object.values(bars).some((el) => !!el), [bars]);

  return isBg ? (
    <div className="fixed inset-0 bg-black/60 z__popup_bg"></div>
  ) : null;
};

export default BgBlack;
