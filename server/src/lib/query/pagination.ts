import { ReqApp } from "../../types/types.js";

export const calcPagination = (req: ReqApp, nHits: number) => {
  const { limit = 4, page = 0 } = req.query;

  const numLimit = +limit;
  const numPage = +page;

  const totPages = Math.ceil(nHits / numLimit);
  const skip = Math.min(nHits, numPage * numLimit);

  return {
    skip,
    totPages,
    limit: numLimit,
  };
};
