import { v4 } from "uuid";

export const addArrIDs = <T>(arr: T[]): (T & { id: string })[] =>
  arr.map((el) => ({
    ...el,
    id: v4(),
  }));
