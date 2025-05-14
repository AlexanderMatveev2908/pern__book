import { ReqApp } from "../../types/types.js";

export const calcPagination = (req: ReqApp, nHits: number) => {
  const { limit = 4, page = 0 } = req.query;

  const totPages = Math.ceil(nHits / +limit);
  const skip = Math.min(nHits, +page * +limit);

  return {
    skip,
    totPages,
    limit,
  };
};
