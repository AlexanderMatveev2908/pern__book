const arg = Array.from({ length: 5 }, (_, i) => {
  if (!i) return [i, i + 1];

  return [i + 0.1, i + 1];
});

export const countTo_5 = () =>
  Array.from({ length: 5 }, (_, i) => (!i ? [i, i + 1] : [i + 0.1, i + 1]));

console.log(countTo_5());
