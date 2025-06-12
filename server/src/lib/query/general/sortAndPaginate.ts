import { ReqApp } from "../../../types/types.js";
import { calcPagination } from "./pagination.js";
import { sortItems } from "./sort.js";

export const sortAndPaginate = <T>(
  req: ReqApp,
  items: T[],
  customSort?: (req: ReqApp, items: T[]) => T[]
): {
  nHits: number;
  totPages: number;
  paginated: T[];
} => {
  const nHits = items.length;
  if (!nHits)
    return {
      nHits,
      totPages: 0,
      paginated: [],
    };

  const { sorted } =
    typeof customSort === "function"
      ? customSort(req, items)
      : sortItems(req, items);

  const { paginated, totPages } = calcPagination({
    req,
    nHits,
    els: sorted,
  });

  return {
    nHits,
    totPages,
    paginated: paginated as T[],
  };
};
