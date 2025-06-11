import { ReqApp } from "../../../types/types.js";

export const calcPagination = <T>({
  req,
  nHits,
  els,
}: {
  req: ReqApp;
  nHits: number;
  els?: T[];
}) => {
  const { limit = 4, page = 0 } = req.query;

  const numLimit = +limit;
  const numPage = +page;

  const totPages: number = Math.ceil(nHits / numLimit);
  const skip: number = Math.min(nHits, numPage * numLimit);

  const paginated = (els ?? []).slice(skip, skip + numLimit);

  return {
    totPages,
    paginated,
  };
};
