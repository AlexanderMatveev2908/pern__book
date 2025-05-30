import { useMemo } from "react";
import { v4 } from "uuid";

type Params = {
  lengths?: (number | undefined)[];
};

export const useCreateIds = ({ lengths }: Params): string[][] => {
  const maxLen = JSON.stringify(lengths ?? []);

  const idsArr = useMemo(
    () =>
      (lengths ?? [])?.map((el) => Array.from({ length: el ?? 0 }, () => v4())),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxLen]
  );

  return idsArr;
};
