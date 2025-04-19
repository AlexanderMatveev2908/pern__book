const calcFromNow = (...args: number[]) =>
  Date.now() +
  1000 * 60 * args.reduce((acc: number, curr: number) => acc * curr, 1);

// MAKE THEM SYNC TO NOT HAVE ERR BETWEEN SERVER AND CLIENT
export const genExpiryJWE = () => calcFromNow(0.25);
export const genExpiryCookie = () => new Date(genExpiryJWE());

export const expiryAccess = "5s";
export const genExpiryCBC = () => calcFromNow(5);
