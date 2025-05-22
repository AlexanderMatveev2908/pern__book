import { useMemo } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Params = {
  varA: any;
  varB: any;
};

export const useMixVars = ({ varA, varB }: Params) => {
  const mix = useMemo(() => varA || varB, [varA, varB]);

  return mix;
};
