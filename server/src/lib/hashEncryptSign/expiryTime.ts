const calcFromNow = (...args: number[]) =>
  Date.now() +
  1000 * 60 * args.reduce((acc: number, curr: number) => acc * curr, 1);

// MAKE THEM SYNC TO NOT HAVE ERR BETWEEN SERVER AND CLIENT
export const genExpiryJWE = () => calcFromNow(60 * 24);

export const expiryAccess = "1m";
export const genExpiryCBC = () => calcFromNow(15);
