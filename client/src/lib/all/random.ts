export const makeRandomMinMax = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const mixArr = (arr: string[]) => {
  let i = arr.length - 1;

  do {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
    i--;
  } while (i > 0);

  return arr;
};
