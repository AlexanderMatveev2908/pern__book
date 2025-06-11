// const recSort = (
//   a: any,
//   b: any,
//   sorters: [string, string][],
//   i: number = 0
// ) => {
//   if (i >= sorters.length) return 0;

import { ReqApp } from "../../../types/types.js";

//   const [k, v] = sorters[i];

//   let val_a = a[k];
//   let val_b = b[k];

//   switch (k) {
//     case "createdAt":
//     case "updatedAt": {
//       val_a = new Date(val_a).getTime();
//       val_b = new Date(val_b).getTime();
//       break;
//     }

//     default: {
//       val_a = +val_a;
//       val_b = +val_b;
//     }
//   }

//   if (val_a === val_b) return recSort(a, b, sorters, i + 1);

//   const delta = val_a > val_b ? 1 : -1;
//   return v === "ASC" ? delta : -delta;
// };

export const sortItems = (req: ReqApp, items: any[]): any => {
  const sorters = Object.entries(req.query ?? {})
    .filter((pair) => pair[0].includes("Sort"))
    .map((el) => [el[0].replace("Sort", ""), el[1]]) as any;

  if (!sorters.length) return { sorted: items };

  const sorted = items.sort((a, b) => {
    let score = 0;

    for (const [k, v] of sorters) {
      let val_a = a[k as keyof typeof a];
      let val_b = b[k as keyof typeof b];

      switch (k) {
        case "createdAt":
        case "updatedAt": {
          val_a = new Date(val_a).getTime();
          val_b = new Date(val_b).getTime();
          break;
        }

        default: {
          val_a = +val_a;
          val_b = +val_b;
        }
      }

      if (val_a === val_b) continue;

      const delta = val_a > val_b ? 1 : -1;
      score += v === "ASC" ? delta : -delta;
    }

    return score;
  });

  return {
    sorted,
  };
};
