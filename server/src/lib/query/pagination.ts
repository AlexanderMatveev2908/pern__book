import { ReqApp } from "../../types/types.js";

export const calcPagination = (req: ReqApp, count: number) => {
  const { limit, page } = req.query;

  const totPages = Math.ceil(count / +limit!);
  const skip = +page! * +limit!;

  return {
    skip,
    totPages,
  };
};
