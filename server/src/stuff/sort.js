const bookStores = [
  {
    name: "A",
    avgQty: 10,
    avgPrice: 1000,
    avgRating: 5,
    createdAt: new Date(2000, 1, 0),
    updatedAt: new Date(3000, 1, 0),
  },
  {
    name: "B",
    avgQty: 5,
    avgPrice: 5,
    avgRating: 7,
    createdAt: new Date(2010, 1, 0),
    updatedAt: new Date(2010, 1, 0),
  },
  {
    name: "C",
    avgQty: 0,
    avgPrice: 0,
    avgRating: 0,
    createdAt: new Date(2020, 1, 0),
    updatedAt: new Date(2020, 1, 0),
  },
];

const sorters = [
  //   ["createdAt", "DESC"],
  //   ["updatedAt", "DESC"],
  ["avgQty", "ASC"],
  ["avgPrice", "DESC"],
  ["avgRating", "DESC"],
];

// const recSort = (a, b, sorters, i = 0) => {
//   if (i >= sorters.length) return 0;

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

// export const sortItems = (items) => {
//   if (sorters.length) items.sort((a, b) => recSort(a, b, sorters));
// };

console.log(bookStores);

bookStores.sort((a, b) => {
  let score = 0;

  for (const [k, v] of sorters) {
    let valA = a[k];
    let valB = b[k];

    if (["createdAt", "updatedAt"].includes(k)) {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    } else if (["avgQty", "avgPrice", "avgRating"].includes(k)) {
      valA = +valA;
      valB = +valB;
    }

    if (valA === valB) continue;

    const delta = valA > valB ? 1 : -1;
    score += v === "ASC" ? delta : -delta;
  }

  return score;
});

// bookStores.sort((a, b) => recSort(a, b, sorters));

console.log("----------------------------------------------SORTED");
console.log(bookStores);
