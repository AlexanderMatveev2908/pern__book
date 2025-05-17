import { useMemo } from "react";
import { v4 } from "uuid";

type Params = {
  lengths?: (number | undefined)[];
};

export const useCreateIds = ({ lengths }: Params): string[][] => {
  const idsArr = useMemo(
    () =>
      (lengths ?? [])?.map((el) => Array.from({ length: el ?? 0 }, () => v4())),
    [lengths]
  );

  return idsArr;
};
